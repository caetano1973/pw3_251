
# 📚 Aula sobre APIs REST

---

## **📌 O que é uma API REST?**
API (Application Programming Interface) é um conjunto de definições e protocolos para construir e integrar software de aplicação. A REST (Representational State Transfer) é um estilo arquitetural que define um conjunto de restrições para a criação de serviços web.

---

## **🗂️ Princípios do REST**
1. **Cliente-Servidor:**  
   A aplicação é dividida em duas partes: Cliente (frontend) e Servidor (backend), que se comunicam através de requisições HTTP.

2. **Stateless (Sem estado):**  
   Cada requisição do cliente para o servidor deve conter todas as informações necessárias para ser entendida, sem depender de contexto armazenado no servidor.

3. **Cacheable:**  
   As respostas devem indicar se podem ou não ser cacheadas, para otimizar o tráfego de rede.

4. **Interface Uniforme:**  
   Para simplificar e separar as arquiteturas, a comunicação entre cliente e servidor deve seguir padrões bem definidos.

5. **Layered System (Sistema em Camadas):**  
   O cliente não sabe se está se comunicando diretamente com o servidor ou com um intermediário (proxy, cache, etc.).

6. **Code on Demand (Opcional):**  
   Permite que o servidor envie código executável (JavaScript, por exemplo) para o cliente, sob demanda.

---

## **🌐 Principais Verbs HTTP (Métodos de requisição)**
| Método   | Ação         | Descrição                                      |
|-----------|-------------|------------------------------------------------|
| **GET**    | Consultar   | Busca dados do servidor (sem alterar estado). |
| **POST**   | Criar       | Envia dados para serem processados e inseridos. |
| **PUT**    | Atualizar   | Atualiza completamente um recurso existente. |
| **PATCH**  | Atualizar   | Atualiza parcialmente um recurso. |
| **DELETE** | Remover     | Remove um recurso existente. |

---

## **📎 Exemplo Prático (CRUD de Membros)**
Imaginemos um endpoint `/membros`:

| Método   | Endpoint      | Descrição                          |
|-----------|--------------|------------------------------------|
| **GET**    | `/membros`       | Lista todos os membros.                |
| **GET**    | `/membros/1`     | Busca o membro de ID 1.                |
| **POST**   | `/membros`       | Adiciona um novo membro.               |
| **PUT**    | `/membros/1`     | Atualiza os dados do membro de ID 1.   |
| **PATCH**  | `/membros/1`     | Atualiza parte dos dados do membro 1.  |
| **DELETE** | `/membros/1`     | Remove o membro de ID 1.               |

---

## **💡 Status Codes mais comuns**
- `200 OK`: Requisição bem-sucedida.
- `201 Created`: Recurso criado com sucesso.
- `204 No Content`: Recurso excluído sem conteúdo de retorno.
- `400 Bad Request`: Erro no cliente (dados inválidos, por exemplo).
- `401 Unauthorized`: Não autorizado (problemas de autenticação).
- `403 Forbidden`: Acesso negado.
- `404 Not Found`: Recurso não encontrado.
- `500 Internal Server Error`: Erro no servidor.

---

## **📌 Estrutura de uma Requisição HTTP**
```http
POST /membros HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json

{
  "nome": "João Silva",
  "foto": "link-da-foto",
  "fone": "11999999999",
  "dataNascimento": "1990-05-15"
}
```

---

## **🔄 Estrutura de uma Resposta HTTP**
```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 1,
  "nome": "João Silva",
  "foto": "link-da-foto",
  "fone": "11999999999",
  "dataNascimento": "1990-05-15",
  "createdAt": "2025-05-15T10:00:00Z"
}
```
