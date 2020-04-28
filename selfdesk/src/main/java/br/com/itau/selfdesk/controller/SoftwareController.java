package br.com.itau.selfdesk.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.itau.selfdesk.dao.SoftwareDAO;
import br.com.itau.selfdesk.model.Software;

@CrossOrigin("*")
@RestController
public class SoftwareController {
	
	@Autowired
	private SoftwareDAO dao;
	
	@GetMapping("/softwares")
	public ResponseEntity<ArrayList<Software>> getAllSoftware(){
		ArrayList<Software> listaSoftware = (ArrayList<Software>)dao.findAll();
		
		return ResponseEntity.ok(listaSoftware);		
	}
	
	@GetMapping("/software/{id}")
	public ResponseEntity<Software> getSoftwareById(@PathVariable int id){
		Software item = dao.findById(id).orElse(null);				
		
		if (item == null) {
			return ResponseEntity.notFound().build();
		}else {
			return ResponseEntity.ok(item);
		}			
	}
	
	@GetMapping("/software/disponiveis")
	public ResponseEntity<ArrayList<Software>> getDisponiveis(){
		ArrayList<Software> disp = (ArrayList<Software>)dao.findByQntLicencaGreaterThan(0);
		
		return ResponseEntity.ok(disp);
	}
	
	

}
