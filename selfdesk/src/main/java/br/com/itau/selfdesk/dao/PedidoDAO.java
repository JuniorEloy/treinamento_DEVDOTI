package br.com.itau.selfdesk.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.itau.selfdesk.model.Pedido;

public interface PedidoDAO extends CrudRepository<Pedido, Integer>{

}
