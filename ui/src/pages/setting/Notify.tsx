import { useTranslation } from "react-i18next";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DingTalk from "@/components/notify/DingTalk";
import Lark from "@/components/notify/Lark";
import NotifyTemplate from "@/components/notify/NotifyTemplate";
import Telegram from "@/components/notify/Telegram";
import Webhook from "@/components/notify/Webhook";
import ServerChan from "@/components/notify/ServerChan";
import Mail from "@/components/notify/Mail";
import Bark from "@/components/notify/Bark";
import { NotifyProvider } from "@/providers/notify";

const Notify = () => {
  const { t } = useTranslation();

  return (
    <>
      <NotifyProvider>
        <div className="border rounded-sm p-5 shadow-lg">
          <Accordion type={"multiple"} className="dark:text-stone-200">
            <AccordionItem value="item-1" className="dark:border-stone-200">
              <AccordionTrigger>{t("settings.notification.template.label")}</AccordionTrigger>
              <AccordionContent>
                <NotifyTemplate />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="border rounded-md p-5 mt-7 shadow-lg">
          <Accordion type={"single"} className="dark:text-stone-200">
            <AccordionItem value="item-2" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.dingtalk")}</AccordionTrigger>
              <AccordionContent>
                <DingTalk />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.lark")}</AccordionTrigger>
              <AccordionContent>
                <Lark />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.telegram")}</AccordionTrigger>
              <AccordionContent>
                <Telegram />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.webhook")}</AccordionTrigger>
              <AccordionContent>
                <Webhook />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.serverchan")}</AccordionTrigger>
              <AccordionContent>
                <ServerChan />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.mail")}</AccordionTrigger>
              <AccordionContent>
                <Mail />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="dark:border-stone-200">
              <AccordionTrigger>{t("common.provider.bark")}</AccordionTrigger>
              <AccordionContent>
                <Bark />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </NotifyProvider>
    </>
  );
};

export default Notify;
