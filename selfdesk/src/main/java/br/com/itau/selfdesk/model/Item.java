package br.com.itau.selfdesk.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="tbl_item")
public class Item {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="num_item")
	private int numItem;

	@ManyToOne
	private Software itemSoftware;
	
	@ManyToOne
	private Pedido pedido;

	public int getNumItem() {
		return numItem;
	}

	public void setNumItem(int numItem) {
		this.numItem = numItem;
	}

	public Software getItemSoftware() {
		return itemSoftware;
	}

	public void setItemSoftware(Software itemSoftware) {
		this.itemSoftware = itemSoftware;
	}

	public Pedido getPedido() {
		return pedido;
	}

	public void setPedido(Pedido pedido) {
		this.pedido = pedido;
	}
	
	
}
