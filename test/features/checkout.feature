Feature: Checkout Process
 Scenario: User goes through checkout process
    Given the user is on the home page
    When the user adds a product to the cart
    And the user proceeds to checkout
    And the user choses payment type
    And the user fills in card details
    And the user fills in invoice address details
    And the user choses delivery type
    And the user reviews the order summary
    And the user submits the order
    Then the order is successfully completed