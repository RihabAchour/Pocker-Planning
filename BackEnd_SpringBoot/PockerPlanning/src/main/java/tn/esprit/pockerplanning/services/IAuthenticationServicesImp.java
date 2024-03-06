package tn.esprit.pockerplanning.services;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.pockerplanning.config.EmailService;
import tn.esprit.pockerplanning.entities.AuthenticationResponse;
import tn.esprit.pockerplanning.entities.Mail;
import tn.esprit.pockerplanning.entities.RefreshTokenRequest;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.repositories.UserRepository;

import java.util.HashMap;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class IAuthenticationServicesImp implements IAuthenticationServices{
    private final UserRepository  userRepository;

    private final AuthenticationManager  authenticationManager;
    private final IJWTServices jwtServices;
    private final  PasswordEncoder passwordEncoder;
    private final EmailService emailService;


    @Override
    public User register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public AuthenticationResponse login(String email, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        var user = userRepository.findByEmail(email).orElse(null);

        // Vérifier si l'utilisateur est vérifié
        if (user.getVerified() && user.getActive()) {
            var jwt = jwtServices.generateToken(user);
            var refreshToken = jwtServices.generateRefreshToken(new HashMap<>(), user);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse();
            authenticationResponse.setAccessToken(jwt);
            authenticationResponse.setRefreshToken(refreshToken);

            User userDetails = convertToUserDto(user);
            authenticationResponse.setUserDetails(userDetails);

            return authenticationResponse;
        } else {
            return null;
        }
    }

    private User convertToUserDto(User user) {
        User dto = new User();
        dto.setId(user.getId());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setPicture(user.getPicture());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword());
        dto.setRole(user.getRole());
        dto.setVerified(user.getVerified());
        return dto;
    }



    @Override
    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken) {
        String userEmail = jwtServices.extractUsername(refreshToken.getRefreshToken());
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        if(jwtServices.isTokenValid(refreshToken.getRefreshToken(), user)) {
            var jwt = jwtServices.generateToken(user);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse();

            authenticationResponse.setAccessToken(jwt);
            authenticationResponse.setRefreshToken(refreshToken.getRefreshToken());
            return authenticationResponse;
        }
        return null;
    }

    @Override
    public HashMap<String, String> forgetPassword(String email) throws MessagingException {

        HashMap message = new HashMap();

        User userexisting = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        UUID token = UUID.randomUUID();
        userexisting.setPasswordResetToken(token.toString());
        userexisting.setId(userexisting.getId());

        String resetpasswordLink = "http://localhost:4200/resetpassword/"+userexisting.getPasswordResetToken();

        Mail mail = new Mail();
        mail.setSubject("Reset Password");
        mail.setTo(userexisting.getEmail());
        mail.setContent("Votre nouveau TOKEN est : <a href='" + resetpasswordLink + "'>" + resetpasswordLink + "</a>");
        emailService.sendHtmlEmail(mail);

        userRepository.save(userexisting);
        message.put("user","user FOUND and email is Sent");
        return message;
    }

    @Override
    public HashMap<String, String> resetPassword(String passwordResetToken, String newPassword) {
        User userexisting = userRepository.findByPasswordResetToken(passwordResetToken).orElseThrow(() -> new RuntimeException("User not found"));
        HashMap message = new HashMap();
        if (userexisting != null) {
            userexisting.setId(userexisting.getId());
            userexisting.setPassword(new BCryptPasswordEncoder().encode(newPassword));
            userexisting.setPasswordResetToken(null);
            userRepository.save(userexisting);
            message.put("resetpassword","succès");
            return message;
        }else
        {
            message.put("resetpassword","Échoué ");
            return message;
        }
    }
}
