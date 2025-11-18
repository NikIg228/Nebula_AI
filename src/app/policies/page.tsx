import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Политики | Nebula AI",
  description: "Политика конфиденциальности и политика использования сервиса Nebula AI",
};

export default function PoliciesPage() {
  return (
    <div className="min-h-screen text-foreground bg-[radial-gradient(circle_at_25%_20%,rgba(138,47,255,0.08),transparent_55%),radial-gradient(circle_at_75%_10%,rgba(168,85,255,0.06),transparent_50%)]">
      <main className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-16 md:px-6">
        <section className="space-y-4 text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Политики
          </h1>
          <p className="text-lg text-muted-foreground">
            Политика конфиденциальности и политика использования сервиса Nebula AI
          </p>
        </section>

        <div className="space-y-8">
          {/* Политика конфиденциальности */}
          <Card className="border-[#8A2FFF]/30 bg-[#0B0B0D]/60 backdrop-blur-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-[#C084FC]" />
                <CardTitle className="text-2xl">Политика конфиденциальности</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground/80">
                  <strong className="text-foreground">Последнее обновление:</strong> {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                
                <div className="space-y-4">
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Общие положения</h3>
                    <p>
                      Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервиса Nebula AI (далее — «Сервис»). 
                      Используя Сервис, вы соглашаетесь с условиями настоящей Политики.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Собираемые данные</h3>
                    <p className="mb-2">Мы собираем следующие типы данных:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Персональные данные: имя, адрес электронной почты, контактная информация</li>
                      <li>Данные об использовании: логи доступа, история взаимодействия с Сервисом</li>
                      <li>Технические данные: IP-адрес, тип браузера, операционная система</li>
                      <li>Загруженные документы: файлы Word, PDF, Excel, которые вы обрабатываете через Сервис</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Цели обработки данных</h3>
                    <p className="mb-2">Персональные данные обрабатываются в следующих целях:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Предоставление доступа к функционалу Сервиса</li>
                      <li>Обработка и анализ загруженных документов</li>
                      <li>Улучшение качества работы Сервиса</li>
                      <li>Обеспечение безопасности и предотвращение мошенничества</li>
                      <li>Связь с пользователями по вопросам использования Сервиса</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Хранение и защита данных</h3>
                    <p>
                      Все данные хранятся на защищённых серверах с использованием современных методов шифрования. 
                      Мы применяем технические и организационные меры для защиты ваших данных от несанкционированного доступа, 
                      изменения, раскрытия или уничтожения. Данные могут храниться как в облачных сервисах (Supabase), 
                      так и в вашем собственном инфраструктурном окружении при использовании приватных подключений.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Передача данных третьим лицам</h3>
                    <p>
                      Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо 
                      для предоставления услуг (например, использование LLM-провайдеров для обработки документов) или 
                      требуется по законодательству. Все третьи стороны обязаны соблюдать конфиденциальность данных.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">6. Ваши права</h3>
                    <p className="mb-2">Вы имеете право:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Получать информацию о ваших персональных данных</li>
                      <li>Требовать исправления неточных данных</li>
                      <li>Требовать удаления ваших данных</li>
                      <li>Отозвать согласие на обработку данных</li>
                      <li>Ограничить обработку ваших данных</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">7. Cookies и аналогичные технологии</h3>
                    <p>
                      Мы используем cookies и аналогичные технологии для улучшения работы Сервиса, анализа использования 
                      и персонализации контента. Вы можете управлять настройками cookies в вашем браузере.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">8. Изменения в Политике</h3>
                    <p>
                      Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                      О существенных изменениях мы уведомим вас по электронной почте или через уведомления в Сервисе.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">9. Контакты</h3>
                    <p>
                      По вопросам, связанным с обработкой персональных данных, вы можете обращаться по адресу: 
                      <a href="mailto:hello@nebula.ai" className="text-[#C084FC] hover:underline ml-1">
                        hello@nebula.ai
                      </a>
                    </p>
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Политика использования */}
          <Card className="border-[#8A2FFF]/30 bg-[#0B0B0D]/60 backdrop-blur-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-[#C084FC]" />
                <CardTitle className="text-2xl">Политика использования</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground/80">
                  <strong className="text-foreground">Последнее обновление:</strong> {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                
                <div className="space-y-4">
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">1. Принятие условий</h3>
                    <p>
                      Используя сервис Nebula AI, вы соглашаетесь соблюдать настоящую Политику использования. 
                      Если вы не согласны с какими-либо условиями, пожалуйста, не используйте Сервис.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">2. Описание сервиса</h3>
                    <p>
                      Nebula AI — это платформа для работы с документами, предоставляющая инструменты для анализа, 
                      редактирования, сравнения версий и генерации отчётов из документов Word, PDF и Excel с использованием 
                      технологий искусственного интеллекта.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">3. Регистрация и учётные записи</h3>
                    <p className="mb-2">При регистрации вы обязуетесь:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Предоставлять точную и актуальную информацию</li>
                      <li>Поддерживать безопасность вашей учётной записи</li>
                      <li>Нести ответственность за все действия, совершённые под вашей учётной записью</li>
                      <li>Немедленно уведомлять нас о любом несанкционированном использовании вашей учётной записи</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">4. Приемлемое использование</h3>
                    <p className="mb-2">Вы соглашаетесь не использовать Сервис для:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Нарушения законов или прав третьих лиц</li>
                      <li>Загрузки вредоносного программного обеспечения или вирусов</li>
                      <li>Попыток несанкционированного доступа к системам или данным</li>
                      <li>Распространения спама, фишинга или мошеннических материалов</li>
                      <li>Нарушения интеллектуальных прав других лиц</li>
                      <li>Обработки конфиденциальных данных без соответствующих разрешений</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">5. Интеллектуальная собственность</h3>
                    <p>
                      Все права на Сервис, включая программное обеспечение, дизайн, тексты и другие материалы, 
                      принадлежат Nebula AI или её лицензиарам. Вы получаете ограниченную, неисключительную, 
                      непередаваемую лицензию на использование Сервиса в соответствии с настоящей Политикой.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">6. Загружаемый контент</h3>
                    <p>
                      Вы сохраняете все права на документы, которые загружаете в Сервис. Загружая документы, 
                      вы предоставляете нам право обрабатывать их для предоставления услуг. Мы не претендуем 
                      на права собственности на ваш контент и не используем его в коммерческих целях без вашего согласия.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">7. Тарифы и оплата</h3>
                    <p>
                      Использование Сервиса может быть платным в соответствии с выбранным тарифным планом. 
                      Все цены указаны на странице тарифов. Оплата производится в соответствии с условиями, 
                      указанными при выборе тарифа. Мы оставляем за собой право изменять тарифы с уведомлением пользователей.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">8. Ограничение ответственности</h3>
                    <p>
                      Сервис предоставляется «как есть». Мы не гарантируем, что Сервис будет работать без ошибок 
                      или прерываний. Мы не несём ответственности за любые убытки, возникшие в результате использования 
                      или невозможности использования Сервиса, включая потерю данных или упущенную выгоду.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">9. Прекращение использования</h3>
                    <p>
                      Мы оставляем за собой право приостановить или прекратить доступ к Сервису для любого пользователя, 
                      нарушающего настоящую Политику использования. Вы можете прекратить использование Сервиса в любое время, 
                      удалив свою учётную запись.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">10. Изменения в Политике</h3>
                    <p>
                      Мы оставляем за собой право изменять настоящую Политику использования в любое время. 
                      О существенных изменениях мы уведомим вас по электронной почте или через уведомления в Сервисе. 
                      Продолжение использования Сервиса после внесения изменений означает ваше согласие с новой версией Политики.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">11. Контакты</h3>
                    <p>
                      По вопросам, связанным с использованием Сервиса, вы можете обращаться по адресу: 
                      <a href="mailto:hello@nebula.ai" className="text-[#C084FC] hover:underline ml-1">
                        hello@nebula.ai
                      </a>
                    </p>
                  </section>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="border-t border-border/60 bg-background/80 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <span>Nebula AI © {new Date().getFullYear()}</span>
          <div className="flex items-center gap-4">
            <Link className="transition hover:text-foreground" href="/pricing">
              Тарифы
            </Link>
            <Link className="transition hover:text-foreground" href="/about">
              О сервисе
            </Link>
            <Link className="transition hover:text-foreground" href="/">
              Главная
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

