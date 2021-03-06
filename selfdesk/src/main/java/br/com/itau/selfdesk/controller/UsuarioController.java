package br.com.itau.selfdesk.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.itau.selfdesk.dao.UsuarioDAO;
import br.com.itau.selfdesk.model.Usuario;

@CrossOrigin("*")
@RestController
public class UsuarioController {
	
	@Autowired
	private UsuarioDAO dao;
	
	@GetMapping("/usuarios")
	public ResponseEntity<ArrayList<Usuario>> getAllUsers(){
		ArrayList<Usuario> lista = (ArrayList<Usuario>)dao.findAll();
		
		return ResponseEntity.ok(lista);
	}
	
	@GetMapping("/usuario/{id}")
	public ResponseEntity<Usuario> getUserByID(@PathVariable int id){
		Usuario user = dao.findById(id).orElse(null);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}
		else {
			return ResponseEntity.ok(user);
		}
	}
	
	@PostMapping("/login")
		public ResponseEntity<Usuario> login(@RequestBody Usuario userForm){
			Usuario logado = dao.findByEmailAndSenha(userForm.getEmail(), userForm.getSenha());
			if (logado == null) {
				return ResponseEntity.status(403).build();
			}
			else {
				return ResponseEntity.ok(logado);
			}
			
		}
	
	@PostMapping("/login/racf")
		public ResponseEntity<Usuario> loginRacf(@RequestBody Usuario userForm){
			Usuario logado = dao.findByRacfAndSenha(userForm.getRacf(), userForm.getSenha());
			if (logado == null) {
				return ResponseEntity.status(403).build();
			}
			else {
				logado.setSenha("");
				return ResponseEntity.ok(logado);
			}
	}
		
		
	
}
