package tn.esprit.pockerplanning.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.pockerplanning.entities.Company;
import tn.esprit.pockerplanning.services.ICompanyServices;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/company")
public class CompanyController {
    private final ICompanyServices iCompanyServices;

    @PostMapping("{idUser}")
    public void addCompany(@RequestBody Company company,@PathVariable long idUser){
        iCompanyServices.addCompany(company,idUser);
    }
    @PutMapping
    public void updateCompany(@RequestBody Company company){
        iCompanyServices.updateCompany(company);
    }
    @GetMapping
    public List<Company> getAllCompany(){
       return  iCompanyServices.getAllCompany();
    }

    @PutMapping("/affecterCompanyADeveloper/{idCompany}/{idUser}")
    public Company affecterCompanyADeveloper(@PathVariable long idCompany , @PathVariable long idUser){
        return iCompanyServices.affecterCompanyADeveloper(idCompany,idUser);
    }

}
