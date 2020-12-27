
Feature: Tiket.com Skill Test

  Scenario: Product Train: Create transaction with non-instant payment for one-way trip, xx adults and xx infants and select seats.

    Given a web browser is on the Tiket.com page
    When the user login facebook with "fffotografi@gmail.com" as username and "CobaLogin123@" as password
    When the user search train with "1" adults and "0" infants and select seats in one-way trip "3" days from today
    And the user use filter for 18:00 -24:00 departure time
    And the user choose first results train
    And the user complete train payment with non instant payment
    Then train transaction is created
    And the user logout