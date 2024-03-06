package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    int points;
    LocalDate date;
    String description;

    @OneToMany(mappedBy = "badge")
    Set<User> userSet;

    @OneToMany(mappedBy = "badge")
    Set<Evaluation> evaluationSet;
}
