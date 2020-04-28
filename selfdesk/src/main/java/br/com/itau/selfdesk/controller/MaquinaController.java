package br.com.itau.selfdesk.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.itau.selfdesk.dao.MaquinaDAO;
import br.com.itau.selfdesk.model.Maquina;


@CrossOrigin("*")
@RestController
public class MaquinaController {
	
	@Autowired
	private MaquinaDAO dao;
	
	@GetMapping("/maquinas")	
	public ResponseEntity<ArrayList<Maquina>> getAllMaquinas(){
		ArrayList<Maquina> items = (ArrayList<Maquina>)dao.findAll();
				
		return ResponseEntity.ok(items);
	}
	
	@GetMapping("/maquina/{id}")
	public ResponseEntity<Maquina> getMaquinaByID(@PathVariable int id){
		Maquina item = dao.findById(id).orElse(null);
		
		if (item == null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(item);			
		}
	}
		
	
}
