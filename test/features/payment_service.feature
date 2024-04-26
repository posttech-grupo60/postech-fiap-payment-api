Feature: Processo de pagamento pelo serviço
  Scenario: Criar  um novo pagamento
    Given Quando tenho uma nova orderId
    When Devo criar um pagamento com o orderId
    Then Precisa existir o pagamento como payment false

  Scenario: Atualizando o pagamento de um pedido
    Given Quando tenho um pagamento
    When Devo atualizar ele para pago
    Then Entao ele precisa passar uma vez pelo update

  Scenario: Listando o pagamento
    Given Quando tenho um novo requerimento de orderId
    When Devo salvar os dados na base
    Then Entao eu preciso encontrar esse pagamento