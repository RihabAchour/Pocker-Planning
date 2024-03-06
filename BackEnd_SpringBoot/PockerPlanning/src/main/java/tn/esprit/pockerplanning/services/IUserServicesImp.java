package tn.esprit.pockerplanning.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.repositories.UserRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class IUserServicesImp implements IUserServices {
    private final UserRepository userRepository;
   /* private final PasswordEncoder  passwordEncoder;*/
    public static String uploadDirectory = System.getProperty("user.dir") + "/uploadUser";
    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService(){
            @Override
            public UserDetails loadUserByUsername(String s) {
                return userRepository.findByEmail(s).orElseThrow(() -> new RuntimeException("User not found"));
            }
        };
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User updateProfil(User user) {
        User existinguser = userRepository.findById(user.getId()).orElse(null);
        if (existinguser != null) {
            if (user.getFirstname() != null) {
                existinguser.setFirstname(user.getFirstname());
            }
            if (user.getLastname() != null) {
                existinguser.setLastname(user.getLastname());
            }
            if (user.getPicture() != null) {
                existinguser.setPicture(user.getPicture());
            }
            if (user.getRole() != null) {
                existinguser.setRole(user.getRole());
            }
            if (user.getEmail() != null) {
                existinguser.setEmail(user.getEmail());
            }
            if (user.getPassword() != null) {
                existinguser.setPassword(user.getPassword());
            }
        }
        return userRepository.save(existinguser);
    }

/*  @Override
    public User updatePassword(Long id, String password) {
        User user =userRepository.findById(id).orElse(null);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }*/

    @Override
    public User updateImage(Long id, MultipartFile file) {
        try {
            User user = userRepository.findById(id).orElse(null);

            String originalFilename = file.getOriginalFilename();
            String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
            Path fileNameAndPath = Paths.get(uploadDirectory, uniqueFilename);

            if (!Files.exists(fileNameAndPath.getParent())) {
                Files.createDirectories(fileNameAndPath.getParent());
            }

            Files.write(fileNameAndPath, file.getBytes());
            user.setPicture(uniqueFilename);
            return userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Error processing file", e);
        }
    }

    @Override
    public List<User> findprojectmanager() {
        return userRepository.findprojectmanager();
    }

    @Override
    public List<User> finddeveloppeur() {
        return userRepository.finddeveloppeur();
    }

    @Override
    public User activateUser(Long userId) {
      User user  = userRepository.findById(userId).orElse(null);
        if (user !=null) {
            user.setActive(true); // Activer l'utilisateur
            return userRepository.save(user);
        } else {
            return null; // Utilisateur non trouvé
        }
    }
    @Override
    public User deactivateUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setActive(false);
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public User activateAccount(String token) {
        // Trouver l'utilisateur correspondant au jeton
        User user = userRepository.findByActivationToken(token);
        if (user != null) {
            // Modifier l'attribut verified de l'utilisateur de false à true
            user.setVerified(true);
            // Enregistrer les modifications dans la base de données
            userRepository.save(user);
        }
        return user;
    }


}
