package tn.esprit.pockerplanning;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Role;
import tn.esprit.pockerplanning.repositories.UserRepository;
@RequiredArgsConstructor
@SpringBootApplication
@EnableAspectJAutoProxy
@EnableScheduling
public class PockerPlanningApplication implements CommandLineRunner {
 private final UserRepository userRepository;

	public static void main(String[] args) {
		SpringApplication.run(PockerPlanningApplication.class, args);
	}
	public void run(String... args) {
		User adminAccount = userRepository.findByRole(tn.esprit.pockerplanning.entities.enums.Role.ADMINISTRATOR);
		if (adminAccount == null) {
			User admin = new User();
			admin.setEmail("admin@gmail.com");
			admin.setFirstname("admin");
			admin.setLastname("admin");
			admin.setActive(true);
			admin.setVerified(true);
			admin.setRole(Role.ADMINISTRATOR);
			admin.setPicture(null);
			admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userRepository.save(admin);
		}
	}
}
