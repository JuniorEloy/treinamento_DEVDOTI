package br.com.itau.selfdesk.dao;

import org.springframework.data.repository.CrudRepository;

import br.com.itau.selfdesk.model.Usuario;

public interface UsuarioDAO extends CrudRepository<Usuario, Integer>{
	public Usuario findByEmailAndSenha(String email, String senha);
	public Usuario findByRacfAndSenha(String email, String senha);
}
