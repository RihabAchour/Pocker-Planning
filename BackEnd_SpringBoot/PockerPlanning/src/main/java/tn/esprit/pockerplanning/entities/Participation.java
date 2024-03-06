package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    String firstname;
    String lastname;
    int number;
    String email;

    @ManyToOne
    User user;

    @ManyToOne
    Evenement evenement;
}
