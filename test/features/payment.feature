Feature: Processo de pagamento
  Scenario: Criar novo pagamento
    Given Quando tenho um orderId
    When Devo criar um pagamento
    Then Precisa existir pagamentos

  Scenario: Criar novo pagamento
    Given Quando tenho um novo pagamento
    When Devo criar um pagamento na base
    Then Quando buscar ele, o pagamento deve estar com o status de pagamento false

  Scenario: Atualizar um pedido para pago
    Given Quando eu adicionar um novo pagamento
    When Devo colocar o pedido como pago
    Then Quando buscar ele, ele precisa estar com o status de pagamento true