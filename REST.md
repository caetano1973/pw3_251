### 1. REST 

Acesso a dados via APIs REST

**VIACEP. Exemplos.**  implementar js react 

https://viacep.com.br/exemplo/javascript/

```
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import axios from "axios";

const BuscaEnderecoViaCEP = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBuscarCep = async () => {
    if (cep.length !== 8) {
      setErro("CEP inválido! Deve conter 8 dígitos.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setErro("CEP não encontrado!");
        setEndereco(null);
      } else {
        setEndereco(response.data);
        setErro("");
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP.");
      setEndereco(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <Input
        placeholder="Digite o CEP (somente números)"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        maxLength={8}
        className="w-60"
      />
      <Button onClick={handleBuscarCep} className="w-60" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Buscar Endereço"}
      </Button>

      {erro && <p className="text-red-500">{erro}</p>}

      {endereco && (
        <Card className="w-80 mt-4">
          <CardContent>
            <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
            <p><strong>Bairro:</strong> {endereco.bairro}</p>
            <p><strong>Cidade:</strong> {endereco.localidade}</p>
            <p><strong>Estado:</strong> {endereco.uf}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BuscaEnderecoViaCEP;

```

### 2. VERBOS HTTP: 

GET 
POST
DELETE 
PATCH

### 3. Atividade coletiva.

Analisar conceitos faltantes:  cookies,REST,testes 


https://4sysops.com/archives/how-to-use-curl-on-windows/


**Lab de REST**

enviar via cmd
game:   postar e deletar conteudo.
criar interface para todos verem o conteudo da base.

Acessar https://caetanocc.github.io/

1. cada aluno deve postar sua linha com nome e data de nascimento.  USAR POST 

2. pedir a todos os alunos para fazer isso. deve ser o primeiro passo da tarefa.

```
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\" }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
```

acessar   https://caetanocc.github.io/rest/lista2.html  para mostrar os resultados.

3. apos os alunos visualizaerem os nomes de tods com as qtdes, ensinar metodo delete 

a. primeiro acessar https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json

b. aplicar comando para delete de um registro.

```
curl -X DELETE https://etec24-3dc8c-default-rtdb.firebaseio.com//game/-Nt6wFA7ELDdtLRwUdCV.json
```

4. pedir aos alunos para realizar mais POST mostrando que aumentam os nrs.
5. marcar 5 min e gamificar, ganha quem tiver a maior qtde 

6. Agora , marcar mais 15 min. dar tempo para pensar em estratégia
7. ganhar quem tiver o maior nr. vale post e delete dos colegas.


8. Usar PATCH para alterar os dados de nota 

```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEALUNO\", \"dtnasc\": \"1980-01-06\"  }" https://etec24-3dc8c-default-rtdb.firebaseio.com//game.json
```

```
curl -X POST -H "Content-Type: application/json" -d "{ \"nome\": \"NOMEDOALUNO\", \"dtnasc\": \"2000-01-06\"  }" https://etec22s2-default-rtdb.firebaseio.com/game.json
```

```
curl https://etec22s2-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json
```

```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"nota\": \"MB" }" https://etec22s2-default-rtdb.firebaseio.com//game/-Ne0YLL3sCnPdVewuM7F.json
```
```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanoc.github.io\" }" https://etec22s2-default-rtdb.firebaseio.com/game/-NWP6XTMmG-0U79bTEF0.json
```

```
curl -X PATCH -H "Content-Type: application/json" -d "{ \"url\": \"caetanoc.github.io\" }" https://etec22s2-default-rtdb.firebaseio.com/game/-Ne0YLL3sCnPdVewuM7F.json
```


### 4. quizizz , tarefa.

https://quizizz.com/admin/quiz/672aa8ad3fb74bdd51002434?searchLocale=

### 5. Explorar games

https://www.moralmachine.net/hl/pt


