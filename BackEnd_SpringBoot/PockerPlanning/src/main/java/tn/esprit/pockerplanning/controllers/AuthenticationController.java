package tn.esprit.pockerplanning.controllers;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pockerplanning.config.EmailService;
import tn.esprit.pockerplanning.entities.AuthenticationResponse;
import tn.esprit.pockerplanning.entities.Mail;
import tn.esprit.pockerplanning.entities.RefreshTokenRequest;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Role;
import tn.esprit.pockerplanning.repositories.UserRepository;
import tn.esprit.pockerplanning.services.IAuthenticationServices;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")

public class AuthenticationController {
    private final IAuthenticationServices authenticationServices;
    private final EmailService emailService;
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploadUser";
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestParam("firstname") String firstname,
                                         @RequestParam("lastname") String lastname,
                                         @RequestParam("email") String email,
                                         @RequestParam("password") String password,
                                         @RequestParam("role") Role role,
                                         @RequestParam("picture") MultipartFile file) throws IOException, MessagingException {
        User user = new User();
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        user.setVerified(false);
        user.setActive(true);

        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        Path fileNameAndPath = Paths.get(uploadDirectory, uniqueFilename);

        if (!Files.exists(fileNameAndPath.getParent())) {
            Files.createDirectories(fileNameAndPath.getParent());
        }

        Files.write(fileNameAndPath, file.getBytes());
        user.setPicture(uniqueFilename);

        // Générer un jeton d'activation unique
        String activationToken = UUID.randomUUID().toString();

        // Stocker le jeton d'activation dans l'utilisateur
        user.setActivationToken(activationToken);

        // Enregistrez l'utilisateur dans la base de données
        User savedUser = authenticationServices.register(user);

        // Créer le lien d'activation
        String activationLink = "http://localhost:8980/PockerPlanning/user/activate?token=" + activationToken;

        // Envoyez un e-mail de vérification avec le lien d'activation
        Mail mail = new Mail();
        mail.setSubject("Verification");
        mail.setTo(user.getEmail());
        mail.setContent("Cliquez sur ce lien pour activer votre compte : <a href='" + activationLink + "'>" + activationLink + "</a>");
        emailService.sendHtmlEmail(mail);

        // Retournez la réponse HTTP avec l'utilisateur enregistré
        return ResponseEntity.ok(savedUser);
    }



    @GetMapping("/{filename:.+}")
    @ResponseBody
  /*  public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws MalformedURLException {

        Path filePath = Paths.get(uploadDirectory).resolve(filename);
        Resource file = new UrlResource(filePath.toUri());

        if (file.exists() || file.isReadable()) {
            return ResponseEntity
                    .ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } else {
            throw new RuntimeException("Could not read the file!");
        }
    }*/
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDirectory).resolve(filename);
            Resource file = new UrlResource(filePath.toUri());

            if (file.exists() && file.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                        .body(file);
            } else {
                return ResponseEntity.notFound().build(); // Fichier non trouvé ou illisible
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build(); // Mauvaise URL
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Erreur interne du serveur
        }
    }


    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody User user) {
        return authenticationServices.login(user.getEmail(), user.getPassword());
    }

    @PostMapping("/refreshToken")
    public AuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshToken) {
        return authenticationServices.refreshToken(refreshToken);
    }

    @PostMapping("/forgetpassword")
    public HashMap<String,String> forgetPassword(@RequestParam String email) throws MessagingException {
        return authenticationServices.forgetPassword(email);
    }

    @PostMapping("/resetPassword/{passwordResetToken}")
    public HashMap<String,String> resetPassword(@PathVariable String passwordResetToken, String newPassword){
        return authenticationServices.resetPassword(passwordResetToken, newPassword);
    }

}
