package br.com.itau.selfdesk.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbl_software")
public class Software {

	@Column(name="id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="descricao", length = 200)
	private String descricao;
	
	@Column(name="qntLicenca")
	private int qntLicenca;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public int getQntLicenca() {
		return qntLicenca;
	}

	public void setQntLicenca(int qntLicenca) {
		this.qntLicenca = qntLicenca;
	}
	
	
		
}
