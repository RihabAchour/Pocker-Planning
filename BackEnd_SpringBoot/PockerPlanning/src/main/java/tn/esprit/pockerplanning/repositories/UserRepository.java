package tn.esprit.pockerplanning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.entities.enums.Role;

import java.util.List;
import java.util.Optional;







public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.role = :role AND NOT EXISTS (SELECT p FROM u.projectSet p WHERE p.id = :projectId)")
    List<User> findByRoleAndNotAssignedToProject(@Param("role") Role role, @Param("projectId") Long projectId);
    List<User> findByProjectSetIdAndRole(long id, Role role);

    Optional<User> findByEmail(String email);
    User findByActivationToken(String token);
    Optional<User> findByPasswordResetToken(String passwordResetToken);
    User findByRole(Role role);
    @Query("SELECT u FROM User u WHERE u.role = 'PROJECTMANAGER' ")
    List<User> findprojectmanager();


    @Query("SELECT u FROM User u WHERE u.role = 'DEVELOPER' ")
    List<User> finddeveloppeur();



}