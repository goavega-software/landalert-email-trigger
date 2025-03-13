const { app } = require('@azure/functions');

app.timer('weeklyReport', {
    schedule: '*/5 * * * *',
    handler: async (myTimer, context) => {
        context.log(`Weekly report function executed at: ${new Date().toISOString()}`);
        try {
            const response = await fetch("https://landalert-uat-appsvc.azurewebsites.net/trigger-report", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            const data = await response.json();
            context.log("Report generated successfully:", data);
        } catch (error) {
            context.log("Error generating report:", error);
        }
    }
});

