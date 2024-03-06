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
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    String name;
    LocalDate startDate;
    LocalDate endDate;
    int duration;
    String objective;


    @ManyToOne
    Project project;

    @OneToOne
    Session session;

    @OneToMany(mappedBy = "sprint",cascade = CascadeType.ALL)
    Set<UserStory> userStorySet;

}
