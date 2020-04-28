package br.com.itau.selfdesk.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.itau.selfdesk.model.Item;

public interface ItemDAO extends CrudRepository<Item, Integer>{

}
