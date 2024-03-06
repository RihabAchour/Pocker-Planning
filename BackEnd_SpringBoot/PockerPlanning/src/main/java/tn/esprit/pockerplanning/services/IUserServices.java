package tn.esprit.pockerplanning.services;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.pockerplanning.entities.User;

import java.io.IOException;
import java.util.List;

public interface IUserServices {


    UserDetailsService userDetailsService();
    User getUserById(Long id);
    User updateProfil(User user);

    /*User updatePassword (Long id, String password);*/
    User updateImage(Long id, MultipartFile file)throws IOException;
    List<User> findprojectmanager();

    List<User> finddeveloppeur();
    User activateUser(Long userId);

    User deactivateUser(Long userId);

    User activateAccount(String token);
}
