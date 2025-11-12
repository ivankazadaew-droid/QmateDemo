Feature: Checkout Process
   Scenario: User goes through checkout process
      Given Home page is opened
      When the user adds a product to the cart
      And the user proceeds to checkout
      And the user choses payment type
      And the user fills in card details
      And the user fills in invoice address details
      And the user choses delivery type
      And the user reviews the order summary
      And the user submits the order
      Then the order is successfully completed

   Scenario Outline: Verify cart contains exactly added products
      When Open Home page
      And Add any product from "<Category>" category filtered by "<Filter>": "<Filter option>" to the cart
      And Add "<Product>" product to the cart with quantity "<Quantity>"
      Then Verify cart contains exactly added products

   Examples:
      | Category     | Filter       | Filter option     | Product        | Quantity |
      | Flat Screens | Availability | Available         | Screen clean   | 2        |
      | Laptops      | Supplier     | Ultrasonic United | Smart Firewall | 4        |

   Scenario: Verify cart contains products selected by category
      When Open Home page
      And Add any product from "Smartphones and Tablets" category to the cart
      Then Verify cart contains exactly added products

   Scenario: Verify cart contains products found by name
      When Open Home page
      And Add "e-Book Reader ReadMe" product to the cart
      Then Verify cart contains exactly added products