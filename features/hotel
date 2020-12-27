
Feature: Tiket.com Skill Test

  Scenario: Product hotel: Create transaction with non-instant payment for xx guest and xx room and login using Facebook

    Given a web browser is on the Tiket.com page
    When the user login facebook with "fulki88@yahoo.co.id" as username and "CobaLogin123@" as password
    And the user search hotel with date "2" days from today, "3" guest and "2" room
    And the user filter results with Rp."1000000" max prices
    And the user choose first results hotel
    And the user complete hotel payment with non instant payment
    Then hotel transaction is created
    And the user logout