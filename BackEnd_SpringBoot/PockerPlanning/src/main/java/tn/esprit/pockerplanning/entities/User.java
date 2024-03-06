package tn.esprit.pockerplanning.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.pockerplanning.entities.enums.Role;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User implements Serializable,UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String firstname;
    String lastname;

    @Column(unique=true)
    String email;
    String password;
    String picture;

    @Enumerated(EnumType.STRING)
    Role role;

    @JsonIgnore
    @ManyToMany
    Set<Project> projectSet;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    Set<Participation> participationSet;

    @JsonIgnore
    @ManyToOne
    Badge badge;

    @JsonIgnore
    @ManyToOne
    Company company;

    String passwordResetToken;

    Boolean verified;

    String activationToken;


    Boolean Active;
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
