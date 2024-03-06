package tn.esprit.pockerplanning.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.services.IUserServices;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {

    private  final IUserServices iUserServices;

    @PutMapping("/update")
    public User updateProfil(@RequestBody User user) {
        return iUserServices.updateProfil(user);
    }

    /*@PutMapping("/updatePassword/{id}/{password}")
    public User updatePassword(@PathVariable Long id, @PathVariable String  password) {
        return iUserServices.updatePassword(id, password);
    }*/

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return iUserServices.getUserById(id);
    }


    @PutMapping("/updateImage/{id}")
    public ResponseEntity<?> updateImage(@PathVariable Long id, @RequestParam("picture") MultipartFile file) {
        try {
            User updateImage = iUserServices.updateImage(id, file);
            return ResponseEntity.ok(updateImage);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating image: " + e.getMessage());
        }
    }


    @GetMapping("/projectmanager")
    public List<User> findprojectmanager(){
        return iUserServices.findprojectmanager();
    }
    @GetMapping("/developer")
    public List<User> finddeveloppeur(){
        return iUserServices.finddeveloppeur();
    }

    @PutMapping("/{userId}/activate")
    public ResponseEntity<User> activateUser(@PathVariable Long userId) {
        User activatedUser = iUserServices.activateUser(userId);
        if (activatedUser != null) {
            return ResponseEntity.ok(activatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{userId}/deactivate")
    public ResponseEntity<User> deactivateUser(@PathVariable Long userId) {
        User deactivatedUser = iUserServices.deactivateUser(userId);
        if (deactivatedUser != null) {
            return ResponseEntity.ok(deactivatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activateAccount(@RequestParam("token") String token) {
        // Vérifier le jeton et activer le compte de l'utilisateur correspondant
        User user = iUserServices.activateAccount(token);
        if (user != null) {
            return ResponseEntity.ok("Votre compte a été activé avec succès !");
        } else {
            return ResponseEntity.badRequest().body("Le lien d'activation n'est pas valide ou a expiré.");
        }
    }


}
