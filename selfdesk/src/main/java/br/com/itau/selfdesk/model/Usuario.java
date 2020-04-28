package br.com.itau.selfdesk.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="tbl_usuario")
public class Usuario {
	
	@Column(name="id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name="email", length = 100)
	private String email;
	
	@Column(name="senha", length = 20)
	private String senha;
	
	@Column(name="nome", length = 150)
	private String nome;
	
	@Column(name="racf", length = 7)
	private String racf;
	
	@Column(name="link_foto", length = 200)
	private String linkFoto;
	
	@Column(name="setor", length = 50)
	private String setor;	
	
	//Relação entre Usuario e Pedido; One To Many 1:N
	//mappedBy indica dentro da classe Pedido qual o nome do atributo
	//         de tipo Usuario que foi declarado
	//         Esse cara faz a chave secundaria
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "solicitante")
	// para evitar um loop infinito, devo ignorar a propriedade que referencia o usuario
	// dentro do objeto Pedido 
	@JsonIgnoreProperties("solicitante")
	private List<Pedido> pedidos;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getRacf() {
		return racf;
	}
	public void setRacf(String racf) {
		this.racf = racf;
	}
	public String getLinkFoto() {
		return linkFoto;
	}
	public void setLinkFoto(String linkFoto) {
		this.linkFoto = linkFoto;
	}
	public String getSetor() {
		return setor;
	}
	public void setSetor(String setor) {
		this.setor = setor;
	}
	public List<Pedido> getPedidos() {
		return pedidos;
	}
	public void setPedidos(List<Pedido> pedidos) {
		this.pedidos = pedidos;
	}
	
	
	
}
