package tn.esprit.pockerplanning.services;

import tn.esprit.pockerplanning.entities.Company;

import java.util.List;

public interface ICompanyServices {

    Company addCompany (Company company ,long idUser);
    List<Company> getAllCompany();

    Company updateCompany(Company company);

    public Company affecterCompanyADeveloper(long idCompany , long idUser);

}
