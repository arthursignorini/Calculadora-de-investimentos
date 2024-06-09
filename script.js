$(function() {

    start();

    function start() {
        $("#screen2").hide();
    }

    function changeScreen() {
        $("#screen1").slideToggle("slow");
        $("#screen2").fadeToggle("slow");
    }

    $("#inputForm").on("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        const name = $("#name").val();
        const initialInvestment = parseFloat($("#initialInvestment").val());
        const monthlyInvestment = parseFloat($("#monthlyInvestment").val());
        const annualInterestRate = parseFloat($("#annualInterestRate").val());
        const contributionTime = parseInt($("#contributionTime").val());

        // Validate input
        if (!name || initialInvestment <= 0 || monthlyInvestment <= 0 || annualInterestRate <= 0 || contributionTime <= 0) {
            return 0;
        }

        // Formatting the contribution time for display
        const years = Math.floor(contributionTime / 12);
        const months = contributionTime % 12;
        const contributionTimeFormatted = years != 0
            ? (years + " anos" + (months != 0 ? " e " + months + " meses" : ""))
            : (months + " meses");

        // Convert annual interest rate to monthly interest rate
        const monthlyInterestRate = Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;

        // Calculate the future value of the initial investment
        const futureValueInitial = initialInvestment * Math.pow(1 + monthlyInterestRate, contributionTime);

        // Calculate the future value of a series of monthly investments
        const futureValueMonthly = monthlyInvestment * ((Math.pow(1 + monthlyInterestRate, contributionTime) - 1) / monthlyInterestRate) * (1 + monthlyInterestRate);

        // Total future value
        const totalFutureValue = futureValueInitial + futureValueMonthly;

        // Total invested
        const totalInvested = initialInvestment + (monthlyInvestment * contributionTime);

        // Profit obtained
        const profit = totalFutureValue - totalInvested;

        // Format the result to 2 decimal places and replace periods with commas
        let result = totalFutureValue.toFixed(2).replace(".", ",");
        let totalInvestedFormatted = totalInvested.toFixed(2).replace(".", ",");
        let profitFormatted = profit.toFixed(2).replace(".", ",");

        // Format the user inputs to 2 decimal places and replace periods with commas
        let initialInvestmentFormatted = initialInvestment.toFixed(2).replace(".", ",");
        let monthlyInvestmentFormatted = monthlyInvestment.toFixed(2).replace(".", ",");

        // Format the query of the output
        const output = `Olá <strong>${name}</strong>, investindo <strong>R$ ${initialInvestmentFormatted}</strong> inicialmente e <strong>R$ ${monthlyInvestmentFormatted}</strong> todo mês,
        você terá <strong>R$ ${result}</strong> em ${contributionTimeFormatted}.<br>
        O total investido será <strong>R$ ${totalInvestedFormatted}</strong> e o lucro obtido será <strong>R$ ${profitFormatted}</strong>.`;

        $("#outputText").html(output);

        changeScreen();
    });

    $("#simulateAgain").on("click", changeScreen);

});
