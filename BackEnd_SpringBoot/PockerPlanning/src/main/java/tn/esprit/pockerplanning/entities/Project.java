package tn.esprit.pockerplanning.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import tn.esprit.pockerplanning.entities.enums.Domain;
import tn.esprit.pockerplanning.entities.enums.StatusProject;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    String name;
    LocalDate startDate;
    LocalDate endDate;
    int nbDeveloper;
    String objective ;
    String technology;
    int badget;



    @Enumerated(EnumType.STRING)
    Domain domain;
    @Enumerated(EnumType.STRING)
    StatusProject statusProject;
    @JsonIgnore
    @ManyToMany(mappedBy = "projectSet")
    Set<User> userSet;
    @OneToMany(mappedBy = "project")
    Set<Ticket> ticketSet;
    @JsonIgnore
    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL)
    Set<Sprint> sprintSet;

}
