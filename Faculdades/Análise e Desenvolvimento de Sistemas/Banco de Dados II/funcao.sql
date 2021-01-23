CREATE or REPLACE function cria_atendente(p_pessoa INTEGER)returns varchar as $$
DECLARE v_pessoa INTEGER;
BEGIN
v_pessoa:=(SELECT id_pessoa FROM atendente WHERE id_pessoa = p_pessoa);
IF (v_pessoa = p_pessoa) THEN
	RETURN'ATENDENTE JA CADASTRADO!';
	END IF;
INSERT INTO atendente(
            id_pessoa)
	VALUES (p_pessoa);
RETURN 'ATENDENTE CADASTRADO!';
END;
$$ LANGUAGE plpgsql;>con->query($sql


select cria_atendente(2);

select * from atendente;



CREATE or REPLACE function cria_pessoa(p_nome VARCHAR,p_cpf VARCHAR,p_telefone VARCHAR)returns varchar as $$

DECLARE v_cpf VARCHAR;

BEGIN
v_cpf:=(SELECT CPF FROM PESSOA WHERE CPF = p_cpf); 
IF ( v_cpf = p_cpf) THEN
	RETURN 'CPF JÁ CADASTRADO!';
	END IF;
INSERT INTO pessoa(
            nome, cpf, telefone)
    VALUES (p_nome,p_cpf,p_telefone);
	RETURN'PESSOA CADASTRADA!';
END;
$$ LANGUAGE plpgsql;

select cria_pessoa ('allan','11243710950','4599999-8888');

select * from pessoa;




