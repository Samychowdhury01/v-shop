import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = ({
  faqs,
}: {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}) => {
  return <div>
      <h3 className="text-lg font-semibold mb-3">
        Frequently Asked Questions For Pod Salt 35K Vape Dubai
      </h3>
            <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
  </div>;
};

export default Faqs;
