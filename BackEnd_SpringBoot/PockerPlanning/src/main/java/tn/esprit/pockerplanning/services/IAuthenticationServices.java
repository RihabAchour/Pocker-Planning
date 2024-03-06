package tn.esprit.pockerplanning.services;

import jakarta.mail.MessagingException;
import tn.esprit.pockerplanning.entities.AuthenticationResponse;
import tn.esprit.pockerplanning.entities.RefreshTokenRequest;
import tn.esprit.pockerplanning.entities.User;

import java.util.HashMap;

public interface IAuthenticationServices {


    User register(User user);
    AuthenticationResponse login(String email, String password);
    AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken);
    HashMap<String,String> forgetPassword(String email) throws MessagingException;
    HashMap<String,String> resetPassword(String passwordResetToken, String newPassword);
}
