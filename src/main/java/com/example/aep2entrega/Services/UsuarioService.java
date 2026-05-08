package com.example.aep2entrega.Services;

import com.example.aep2entrega.Entitys.Cidadao;
import com.example.aep2entrega.Entitys.Gestor;
import com.example.aep2entrega.Repositories.CidadaoRepository;
import com.example.aep2entrega.Repositories.GestorRepository;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    private final GestorRepository gestorRepository;
    private final CidadaoRepository cidadaoRepository;

    public UsuarioService(GestorRepository gestorRepository, CidadaoRepository cidadaoRepository) {
        this.gestorRepository = gestorRepository;
        this.cidadaoRepository = cidadaoRepository;
    }

    public Cidadao realizarLoginCidadao(String cpf) {
        // Busca o cidadão no banco; se não existir, cria um novo (seguindo sua lógica original)
        return cidadaoRepository.findByCpf(cpf)
                .orElseGet(() -> {
                    Cidadao novoCidadao = new Cidadao();
                    novoCidadao.setCpf(cpf);
                    return cidadaoRepository.save(novoCidadao);
                });
    }

    public Gestor cadastrarGestor(Gestor gestor, String confirmacaoSenha) {
        if (!gestor.getSenha().equals(confirmacaoSenha)) {
            throw new RuntimeException("A senha e a confirmação não coincidem.");
        }

        if (gestorRepository.existsByEmailOrCpf(gestor.getEmail(), gestor.getCpf())) {
            throw new RuntimeException("E-mail ou CPF já cadastrados.");
        }

        return gestorRepository.save(gestor);
    }

    public Gestor realizarLoginGestor(String email, String senha) {
        Gestor gestor = gestorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("E-mail não encontrado."));

        if (!gestor.getSenha().equals(senha)) {
            throw new RuntimeException("Senha incorreta.");
        }

        return gestor;
    }
}
