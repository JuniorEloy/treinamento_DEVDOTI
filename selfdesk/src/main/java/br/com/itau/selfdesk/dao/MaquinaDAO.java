package br.com.itau.selfdesk.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.com.itau.selfdesk.model.Maquina;

public interface MaquinaDAO extends CrudRepository<Maquina, Integer>{
	public List<Maquina> findByEstoqueGreaterThan(int estoque);

}