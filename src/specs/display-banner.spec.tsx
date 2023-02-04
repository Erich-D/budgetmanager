import { render, screen } from "@testing-library/react";
import { DisplayNumber } from "../display-banner";

test("Display expenses", async ()=>{

    const displayValues = {
        title: "test Display",
        value: 20,
        prefix: "$$$"
    }

    render(<DisplayNumber {...displayValues}/>)

    const eltitle = await screen.findByText(/test Display/);
    const elvalue = await screen.findByText(/[$$$]/);

    expect(eltitle.innerHTML).toBe("test Display");
    expect(elvalue.innerHTML).toBe("$$$20")
})