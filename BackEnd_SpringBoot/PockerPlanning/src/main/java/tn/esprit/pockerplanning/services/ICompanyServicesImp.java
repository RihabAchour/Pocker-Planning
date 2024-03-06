package tn.esprit.pockerplanning.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import tn.esprit.pockerplanning.entities.Company;
import tn.esprit.pockerplanning.entities.User;
import tn.esprit.pockerplanning.repositories.CompanyRepository;
import tn.esprit.pockerplanning.repositories.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ICompanyServicesImp implements ICompanyServices{

        private final CompanyRepository companyRepository;
        private final UserRepository userRepository;


    @Override
    public Company addCompany(Company company, long idUser) {
        User user =userRepository.findById(idUser).orElse(null);
        companyRepository.save(company);
        Assert.notNull(user,"user should not be null");

        user.setCompany(company);
        userRepository.save(user);
        return company;
    }

    @Override
    public List<Company> getAllCompany() {
        return (List<Company>) companyRepository.findAll();
    }

    @Override
    public Company updateCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company affecterCompanyADeveloper(long idCompany, long idUser) {
        User user =userRepository.findById(idUser).orElse(null);
        Company company=companyRepository.findById(idUser).orElse(null);

        user.setCompany(company);
        companyRepository.save(company);

        return company;
    }


}
