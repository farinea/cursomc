package com.farinea.finanzaio.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.farinea.finanzaio.domain.Categoria;
import com.farinea.finanzaio.domain.Cidade;
import com.farinea.finanzaio.domain.Cliente;
import com.farinea.finanzaio.domain.Endereco;
import com.farinea.finanzaio.domain.Estado;
import com.farinea.finanzaio.domain.Movimento;
import com.farinea.finanzaio.domain.MovimentoConta;
import com.farinea.finanzaio.domain.enums.Perfil;
import com.farinea.finanzaio.domain.enums.TipoCliente;
import com.farinea.finanzaio.domain.enums.TipoConta;
import com.farinea.finanzaio.repositories.CategoriaRepository;
import com.farinea.finanzaio.repositories.CidadeRepository;
import com.farinea.finanzaio.repositories.ClienteRepository;
import com.farinea.finanzaio.repositories.EnderecoRepository;
import com.farinea.finanzaio.repositories.EstadoRepository;
import com.farinea.finanzaio.repositories.MovimentoContaRepository;
import com.farinea.finanzaio.repositories.MovimentoRepository;

@Service
public class DBService {

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Autowired
	private EstadoRepository estadoRepository;

	@Autowired
	private CidadeRepository cidadeRepository;

	@Autowired
	private ClienteRepository clienteRepository;

	@Autowired
	private EnderecoRepository enderecoRepository;

	@Autowired
	private MovimentoRepository movimentoRepository;
	
	@Autowired
	private MovimentoContaRepository movimentoContaRepository;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	public void instantiateTestDatabase() throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		Categoria cat1 = new Categoria(null, "Dinheiro", TipoConta.CONTA_CORRENTE, 10.00);
		Categoria cat2 = new Categoria(null, "CEF", TipoConta.CONTA_CORRENTE, 5125.34);
		Categoria cat3 = new Categoria(null, "Aluguel", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat4 = new Categoria(null, "Condomínio", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat5 = new Categoria(null, "Agua", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat6 = new Categoria(null, "Energia Elétrica", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat7 = new Categoria(null, "Gás", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat8 = new Categoria(null, "Internet", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat9 = new Categoria(null, "Mercado", TipoConta.CONTA_DESPESA, 0.00);
		Categoria cat10 = new Categoria(null, "Salário", TipoConta.CONTA_RECEITA, 0.00);
		Categoria cat11 = new Categoria(null, "Restituição IR", TipoConta.CONTA_RECEITA, 0.00);
		Categoria cat12 = new Categoria(null, "Rendimento de Aplicação", TipoConta.CONTA_RECEITA, 0.00);
		Categoria cat13 = new Categoria(null, "Apartamento", TipoConta.CONTA_IMOBILIZADO, 130000.00);
		Categoria cat14 = new Categoria(null, "Carro", TipoConta.CONTA_IMOBILIZADO, 15000.00);

		categoriaRepository.saveAll(Arrays.asList(cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11, cat12, cat13, cat14));

		Estado est1 = new Estado(null, "Santa Catarina");

		Cidade c1 = new Cidade(null, "Florianópolis", est1);
		Cidade c2 = new Cidade(null, "São José", est1);
		Cidade c3 = new Cidade(null, "Palhoça", est1);

		est1.getCidades().addAll(Arrays.asList(c1));

		estadoRepository.saveAll(Arrays.asList(est1));
		cidadeRepository.saveAll(Arrays.asList(c1,c2,c3));
		
		Cliente cli1 = new Cliente(null, "Wagner Farinea", "wagnereffe@gmail.com", "02183260920", TipoCliente.PESSOAFISICA, pe.encode("123"));
		cli1.getTelefones().addAll(Arrays.asList("93838393","27363323"));

		Cliente cli2 = new Cliente(null, "Grace Claret de Medeiros", "grace.clm@hotmail.com", "05513806916", TipoCliente.PESSOAFISICA, pe.encode("123"));
		cli2.getTelefones().addAll(Arrays.asList("83739393","63763323"));
		cli2.addPerfil(Perfil.ADMIN);
		
		Endereco e1 = new Endereco(null, "Rua São Paulo", "119", "Casa", "Bela Vista", "88110455", cli1, c1);
		
		cli1.getEnderecos().addAll(Arrays.asList(e1));
		cli2.getEnderecos().addAll(Arrays.asList(e1));
		
		clienteRepository.saveAll(Arrays.asList(cli1, cli2));
		enderecoRepository.saveAll(Arrays.asList(e1));
				
		Movimento mov1 = new Movimento(null, sdf.parse("30/08/2019"), "PADARIA");
		Movimento mov2 = new Movimento(null, sdf.parse("30/08/2019"), "FEIRA");
		Movimento mov3 = new Movimento(null, sdf.parse("10/09/2019"), "INTERNET");
		
		movimentoRepository.saveAll(Arrays.asList(mov1,mov2, mov3));

		MovimentoConta mDeb1  = new MovimentoConta(null,mov1,cat9,-5.00);
		MovimentoConta mCred1 = new MovimentoConta(null,mov1,cat1,5.00);
		MovimentoConta mDeb2  = new MovimentoConta(null,mov2,cat9,-51.22);
		MovimentoConta mCred2 = new MovimentoConta(null,mov2,cat2,51.22);
		MovimentoConta mDeb3  = new MovimentoConta(null,mov3,cat8,-99.00);
		MovimentoConta mCred3 = new MovimentoConta(null,mov3,cat2,99.00);
		
		mov1.getContas().addAll(Arrays.asList(mDeb1,mCred1));
		mov2.getContas().addAll(Arrays.asList(mDeb2,mCred2));
		mov3.getContas().addAll(Arrays.asList(mDeb3,mCred3));
				
		movimentoContaRepository.saveAll(Arrays.asList(mDeb1,mCred1,mDeb2,mCred2,mDeb3,mCred3));

	}
}
