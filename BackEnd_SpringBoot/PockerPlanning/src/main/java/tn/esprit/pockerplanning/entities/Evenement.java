package tn.esprit.pockerplanning.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    long id;

    String address;
    LocalDate date;
    String description ;
    String name;
    int nbPlace;
    String picture;
    float price;
    LocalTime hour;

    @OneToMany(mappedBy = "evenement")
    Set<Supplier> supplierSet;

    @OneToMany (mappedBy = "evenement")
    Set<Participation> partcipationSet;

    @OneToMany(mappedBy = "evenement", cascade = CascadeType.PERSIST)
    Set<Activity> activitySet;


}
