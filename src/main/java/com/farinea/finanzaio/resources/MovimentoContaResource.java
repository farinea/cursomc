package com.farinea.finanzaio.resources;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.farinea.finanzaio.dto.BalanceteDTO;
import com.farinea.finanzaio.dto.ComposicaoSaldosDTO;
import com.farinea.finanzaio.dto.MovimentosDTO;
import com.farinea.finanzaio.dto.SaldosDTO;
import com.farinea.finanzaio.interfaces.BalanceteProjection;
import com.farinea.finanzaio.interfaces.ComposicaoSaldoProjection;
import com.farinea.finanzaio.interfaces.SaldosProjection;
import com.farinea.finanzaio.services.CategoriaService;
import com.farinea.finanzaio.services.MovimentoContaService;

@RestController
@RequestMapping(value="/movimentos")
public class MovimentoContaResource {
	
	@Autowired
	private MovimentoContaService service;
		
	@Autowired
	private CategoriaService categoria;

	@RequestMapping(value="/{conta}",method=RequestMethod.GET)
	public ResponseEntity<List<MovimentosDTO>> findMovimentos(@PathVariable Integer conta) {
		List<MovimentosDTO> list = service.findMovimentos(conta);
		return ResponseEntity.ok().body(list);
	}

	@RequestMapping(value="/saldos/{data}/{tipo}",method=RequestMethod.GET)
	public ResponseEntity<List<SaldosDTO>> findSaldos(@PathVariable String data, @PathVariable Integer tipo) {
		List<SaldosProjection> list = null;
		List<SaldosDTO> new_list = new ArrayList<SaldosDTO>();
		
		try {
			list = service.findSaldos(new SimpleDateFormat("dd-MM-yyyy").parse(data), tipo);
			
			for (SaldosProjection x:list) {
				SaldosDTO cs = new SaldosDTO(categoria.find(x.getcategoria()),x.getsaldo());
				new_list.add(cs);
			}

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.ok().body(new_list);
	}
	
	@RequestMapping(value="/composicao/{data}",method=RequestMethod.GET)
	public ResponseEntity<List<ComposicaoSaldosDTO>> findComposicaoSaldos(@PathVariable String data) {
		List<ComposicaoSaldoProjection> list = null;
		List<ComposicaoSaldosDTO> new_list = new ArrayList<ComposicaoSaldosDTO>();
		try {
			list = service.findComposicaoSaldos(new SimpleDateFormat("dd-MM-yyyy").parse(data));
			
			for (ComposicaoSaldoProjection x:list) {
				ComposicaoSaldosDTO cs = new ComposicaoSaldosDTO(Integer.parseInt(x.gettipo()),x.getsaldo());
				new_list.add(cs);
			}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.ok().body(new_list);
	}

	@RequestMapping(value="/balancete/{ano}",method=RequestMethod.GET)
	public ResponseEntity<List<BalanceteDTO>> findBalancete(@PathVariable Integer ano) {
		List<BalanceteProjection> list = null;
		List<BalanceteDTO> new_list = new ArrayList<BalanceteDTO>();
			list = service.findBalancete(ano);
			
			for (BalanceteProjection x:list) {
				BalanceteDTO cs = new BalanceteDTO(x.getcategoriaNome(),x.gettipoConta(),x.getano(),x.getmes(),x.gettotal());
				new_list.add(cs);
			}
			
		return ResponseEntity.ok().body(new_list);
	}

	@RequestMapping(value="/saldo/{conta}/{data}",method=RequestMethod.GET)
	public ResponseEntity<SaldosDTO> findSaldoByConta(@PathVariable Integer conta, @PathVariable String data) {
		SaldosDTO saldos = null;
		try {
			saldos = service.findSaldoByConta(conta, new SimpleDateFormat("dd-MM-yyyy").parse(data));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.ok().body(saldos);
	}

}
