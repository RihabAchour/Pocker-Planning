package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.pockerplanning.entities.enums.StatusUs;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserStory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    String description;
    int duration;
    int priority ;
    LocalDate startDate;
    LocalDate endDate;

    @Enumerated(EnumType.STRING)
    StatusUs status;


    @ManyToOne
    Sprint sprint;

    @OneToMany(mappedBy = "userStory",cascade = CascadeType.ALL)
    Set<Note> noteSet;

    @ManyToMany
    Set<Card> cardSet;

}
