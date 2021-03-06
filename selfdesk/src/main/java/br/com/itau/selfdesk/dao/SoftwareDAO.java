package br.com.itau.selfdesk.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.itau.selfdesk.model.Software;

public interface SoftwareDAO extends CrudRepository<Software, Integer> {
	public List<Software> findByQntLicencaGreaterThan(int qntLicenca);
	
}
