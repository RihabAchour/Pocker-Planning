package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.pockerplanning.entities.enums.CurrentState;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    LocalDate startDate;
    LocalDate endDate;
    int duration;

    @Enumerated(EnumType.STRING)
    CurrentState currentState;

    @OneToOne(mappedBy = "session")
    Sprint sprint;


}
