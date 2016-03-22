puts "-----------------"
puts "Invest game ~俺のポートフォリオ~"
puts "2016 H.Yoshiki   CC BY-NC-SA 4.0"
puts "-----------------"


# data structures
ActionRecords = Struct.new(:month,:action, :cash, :assets, :debts, :incomes)

# class settings
class GameMain
    attr_reader :month_count, :asset, :debt, :finish
    attr_writer :action_ofmonth
    attr_accessor :cash, :act_record, :stk, :bnd, :dbt, :lbr
    
    def initialize(usr_name, length_of_game, initial_cash)
    #game settings
        @usr_name = usr_name
        @month_final = length_of_game       #最終月は length_of_game ヶ月目
        @month_count = 1
        @finish  = 0    #終了フラグ
    #finantial state initialize
        @cash   = initial_cash
        @v_o_stk= 0
        @v_o_bnd= 0
        @a_o_dbt= 0
        @asset  = @cash + @v_o_stk + @v_o_bnd
        @equity = @asset - @a_o_dbt
        @roe    = 0
    #Records
        @act_record = Array.new()
        @act_record << ActionRecords.new("Month", "Action", "Cash", "Assets", "Debts", "Incomes")
        @closing_header = Array.new(37)
    end

    def quick_report
       c_qr = @cash.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse
       a_qr = @asset.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse
       d_qr = @debt.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse 
       puts "Name:  #{@usr_name},  Months: #{@month_count}"
       puts "Cash:  $#{c_qr}"
       puts "Assets:$#{a_qr}, Debts: $#{d_qr}"
    end

    def cash_report
       c_qr = @cash.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse
       puts "Cash amount:  $#{c_qr}"
    end

    def closing(val_stk, val_bnd, amt_dbt)
        @v_o_stk= val_stk
        @v_o_bnd= val_bnd
        @a_o_dbt= amt_dbt
        
        @asset  = @cash + @v_o_stk + @v_o_bnd
        @equity = @asset - @a_o_dbt
        
        
        #count months
        @month_count +=1
        if @month_count == 36
            @finish = 1
        end
    end

    #class methods
    def self.help
        puts "-----------------"
        puts "Investment Game  ~My portfolio~"
        puts "Help document"
        puts "-----------------\n\n"
        puts "1. Game purpose"
        puts " Maximize your EQUITY by your decision makings.\n\n"
        puts "Just FYI:"
        puts " (Equity) = (Assets) - (Debts)."
        puts " (Assets) = (Cash) + (value of Stocks) + (value of bonds).\n\n"
        puts "2. How game goes on"
        puts " At first, you'll be given $10,000 cash."
        puts " You have 36 months to go (default, you can set other length)."
        puts " Each month brings you a chance to choose your action."
        puts " Every action requires one month but 'check'.\n\n"
        puts "3. Actions"
        puts " [1] Buy stocks"
        puts " You can buy stocks by cash."
        puts " Stocks are assets but the value of stocks changes."
        puts " The value change rate is expected to -15~+10%. However, events will change the rate."
        puts " Stocks produce income. 3-7% of the value will be add to your cash at every months."
        puts " [2] Sell stocks"
        puts " You can sell stocks."
        puts " You get cash which value is equal to the one of stock you choose."
        puts " [3] Buy Bonds"
        puts " You can buy bonds by cash."
        puts " Bonds are assets which have stable value."
        puts " Bonds produce income. 1-2.5% of the value will be add to your cash at every months."
        puts " [4] Sell bonds"
        puts " You can sell bonds."
        puts " You get cash which value is equal to the one of bonds you choose."
        puts " [5] Loan from bank"
        puts " You can borrow money. The amount you borrow will be debt."
        puts " CAP. RATIO AFTER YOU BORROW MUST BE >10%."
        puts " COMPOUND monthly interest rate is 2%."
        puts " [6] Pay back"
        puts " You can pay back your debt."
        puts " [7] Labor!"
        puts " You can earn money from your consulting job."
        puts " Expected income is: $1,000 - $5,000."
        puts " The expectation of income increase by investing yourself."
        puts " [8] Invest yourself"
        puts " You can invest yourself and increase the amount of your income."        
        puts " [9] Check"
        puts " You can check your financial condition.\n\n"     
        puts "4. Result"
        puts " After 36 month, result is displayed."
        puts " YOUR SCORE IS YOUR ROE."
        puts " (YOUR ROE)       = (Equity at last) / ($10,000)."
        puts " (Equity at last) = (Assets at last) - (Debts at last)."
        puts " (Assets) = (Cash) + (value of Stocks) + (value of bonds)."
        puts "-----------------"
    end
    
    def self.helpjp
        puts "-----------------"
        puts "Investment Game  ~俺のポートフォリオ~"
        puts "日本語ヘルプ"
        puts "-----------------\n\n"
        puts "1. ゲームの目的"
        puts " あなたの意思決定で資本(Equity)を最大化してください.\n\n"        
        puts "Just FYI:"
        puts " (Equity 資本) = (Assets 資産) - (Debts 負債)."
        puts " (Assets 資産) = (Cash 現金) + (value of Stocks 株式評価額) + (value of bonds 債権評価額).\n\n"
        puts "2. ゲーム進行"
        puts " はじめに、現金$10,000をもらえます."
        puts " 36ヶ月の間に、資産を最大化してください."
        puts " 毎月1つだけアクションをすることができます."
        puts " すべてのアクションは1ヶ月を消費しますが、チェックだけは消費しません。\n\n"
        puts "3. アクション"
        puts " [1] Buy stock　株式購入"
        puts " 現金を消費して株式を購入できます."
        puts " 株式は資産になりますが評価額は毎月変動します."
        puts " 変動率は -15~+10% ですが、イベント発生時はその限りではありません。."
        puts " 株式は収益を生みます。評価額の3~7%が現金収入として毎月手に入ります。"
        puts " [2] Sell stocks　株式売却"
        puts " 株式を売却できます。"
        puts " 評価額と同額の現金収入が得られます."
        puts " [3] Buy Bonds　債権購入"
        puts " 現金を消費して債権を購入できます。"
        puts " 債権は資産になり、評価額は一定です。"
        puts " 債権は収益を生みます。評価額の 2-4% が現金収入として毎月手に入ります。"
        puts " [4] Sell bonds　債権売却"
        puts " 債権を売却できます."
        puts " 評価額と同額の現金収入が得られます。."
        puts " [5] Loan from bank　銀行借入"
        puts " 借り入れができます。借入額は負債になります。"
        puts " 借入後の自己資本率は、10%以上でなければなりません。"
        puts " 利息は毎月複利で2%です。"
        puts " [6] Pay back 返済"
        puts " 借金を現金で返済できます。"
        puts " [7] Labor! 労働"
        puts " コンサルかなにかをしてお金を稼ぎます。"
        puts " 収入は、月収で $1,000 - $5,000 が見込まれます。"
        puts " 月収の期待値は、自己投資で増加します。"
        puts " [8] Invest yourself　自己投資"
        puts " 自分自身に投資して、労働による収益期待値を上げます。"        
        puts " [9] Check"
        puts " 財政状況を確認できます。"
        puts "4. 結果"
        puts " 36ヶ月後、結果が表示されます。"
        puts " あなたのスコアは、あなたのROEです。"
        puts " (YOUR ROE　あなたのROE)       = (Equity at last　最終資本) / ($10,000)."
        puts " (Equity at last　最終資本)    = (Assets at last  最終資産) - (Debts at last　最終負債)."
        puts " (Assets　資本) = (Cash　現金) + (value of Stocks　株式評価額) + (value of bonds　債権評価額)."
        puts "-----------------"
    end
end

class Stocks
    @@id_stock = 0

    attr_reader :id, :state, :value, :value_initial, :income, :when_buy, :when_sold,:income, :total_income

    def initialize(value_initial, month)
    #settings
        @@id_stock += 1
        @id = @@id_stock
        @state = "HOLD"       
        @value_initial = value_initial
        @value = value_initial
        @when_buy = month
        @when_sold= "--"
        @income = 0
        @total_income = 0

        puts "You bought stocks(ID: #{@id}) using $#{@value} at month #{@when_buy}."
    end

    def sell(month)        #process which increase cash
        @state        =  "SOLD"
        @when_sold = month
        puts "You sold stocks(ID: #{@id}) with $#{@value} at month #{@when_sold}."
    end
    
    def closing     #monthly closing process
        random = Random.new
        p1 = random.rand(1..26)
        p2 = random.rand(3..7)
        @income= @value * p2* 0.01
        @income= @income.round
        @total_income =+ @income
        @value = @value * (1+(p1-16)*0.01)
        @value = @value.round        
    end
    
    def get_id
        @@id_stock
    end
end

class Bonds
    @@id_bond = 0

    attr_reader :id, :state, :value, :value_initial, :income, :when_buy, :when_sold,:income, :total_income

    def initialize(value_initial, month)
    #settings
        @@id_bond += 1
        @id = @@id_bond
        @state = "HOLD"       
        @value_initial = value_initial
        @value = value_initial
        @when_buy = month
        @when_sold= "--"
        @income = 0
        @total_income = 0

        puts "You bought bonds(ID: #{@id}) using $#{@value} at month #{@when_buy}."
    end

    def sell(month)        #process which increase cash
        @state        =  "SOLD"
        @when_sold = month
        puts "You sold bonds(ID: #{@id}) with $#{@value} at month #{@when_sold}."
    end
    
    def closing     #monthly closing process
        random = Random.new
        p1 = random.rand(2..4)
        @income= @value * p1* 0.01
        @income= @income.round
        @total_income =+ @income       
    end
    def get_id
        @@id_bond
    end
end



# main process

puts "This game is a simple simulation of investment activity."
puts "You can choose an activity in each months."
puts "Press [s] to start game. If you need help, press [h]."
puts "Need help in Japanese? press [j]."
need_help = gets.chomp

while need_help != "s"
    if need_help == "h"
        GameMain.help
        puts "Are you OK? Press [s] to start game. If you need help in Japanese? press [j]."
        need_help = gets.chomp
    elsif need_help=="j"
        GameMain.helpjp
        puts "Are you OK? Press [s] to start game. If you need help in English? press [h]."
        need_help = gets.chomp
    else
        puts "Pardon me? press [s]/[h]/[j]."
        need_help = gets.chomp
    end
end


# game start

puts "Game start!. Put your name..."
name = gets.chomp
this_game = GameMain.new(name,36,10000)
pointer = Array.new(37)
actcodes= Array.new(37)
pointer[0] = "null"
actcodes[0]= 0


#main loop

while this_game.finish == 0
    
    puts "==================="
    this_game.quick_report
    puts "==================="
    puts "Choose your action on this month."
    puts "[1] Buy  stocks   [6] Pay back"
    puts "[2] Sell stocks   [7] Labor!"
    puts "[3] Buy  Bonds    [8] Invest yourself"
    puts "[4] Sell Bonds    [9] Check"
    puts "[5] Loan from bank stocks"
    puts "[10] skip this month"
    act_no = gets.chomp.to_i
    decision_flag = 1
    
    while decision_flag == 1
        month = this_game.month_count
        actcodes[month] = act_no
        case act_no
            when 1   #BUY STOCKS
                actcodes[month] = 1
                puts "How much you pay for stocks?"
                this_game.cash_report
                amount = gets.chomp.to_i
                while amount > this_game.cash+1
                    puts "Sorry. You don't have enough cash."
                    amount = gets.chomp.to_i
                end
                stk= Stocks.new(amount, month)
                this_game.cash -= amount
                this_game.act_record << ActionRecords.new(month, "Buy stocks", "-$"+amount.to_s, "+$"+amount.to_s, "+/- 0", "+/- 0")
                pointer[month]=stk  #第5月に生成したオブジェクトは，pointer[5]に格納
                decision_flag = 0

            when 2
                puts "Which stock do you want to sell? Put month you bought."
                puts "WHEN  |STATE | CURRENT VALUE | INITIAL VALUE | TOTAL INCOME"
                    i=1
                    lists = Array.new()
                    until i == month
                        var = this_game.act_record.at(i).values_at(1)
                        if var[0] == "Buy stocks"
                            print "Month", pointer[i].when_buy, " | ",  pointer[i].state,  " | $", pointer[i].value.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse, " | $", pointer[i].value_initial.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse, "| $", pointer[i].total_income.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse, "\n"
                            lists.push(pointer[i].when_buy)
                        end
                        i += 1
                    end
                #puts lists
                
                selector = gets.chomp.to_i
                
                until lists.include?(selector)
                    puts "Hmm... stock with the id you put is missing. Select again."
                    selector = gets.chomp.to_i
                end
                
                this_game.cash += pointer[selector].value
                pointer[selector].sell(month)
                this_game.act_record << ActionRecords.new(month, "Sell stocks", "+$"+amount.to_s, "-$"+amount.to_s, "+/- 0", "+/- 0")
                decision_flag = 0
                
            when 3
#                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                actcodes[month] = 3
                puts "How much you pay for bonds?"
                this_game.cash_report
                amount = gets.chomp.to_i
                while amount > this_game.cash+1
                    puts "Sorry. You don't have enough cash."
                    amount = gets.chomp.to_i
                end
                bnd= Bonds.new(amount, month)
                this_game.cash -= amount
                this_game.act_record << ActionRecords.new(month, "Buy bonds", "-$"+amount.to_s, "+$"+amount.to_s, "+/- 0", "+/- 0")
                pointer[month]=bnd
                decision_flag = 0
 
                #Bonds.new
                decision_flag = 0
            when 4
#                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                #Bonds.sell
                puts "Which bond do you want to sell? Put month you bought."
                puts "WHEN  |STATE | CURRENT VALUE | INITIAL VALUE | TOTAL INCOME"
                    i=1
                    lists = Array.new()
                    until i == month
                        if this_game.act_record.at(i).values_at(1).nil? == false
                            var = this_game.act_record.at(i).values_at(1)
                            if var[0] == "Buy bonds"
                                print "Month", pointer[i].when_buy, " | ",  pointer[i].state,  " | $", pointer[i].value.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse, " | $", pointer[i].value_initial.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse, "| $", pointer[i].total_income.to_s.reverse.gsub( /(\d{3})(?=\d)/, '\1,').reverse, "\n"
                                lists.push(pointer[i].when_buy)
                            end
                        end
                        i += 1                    
                    end
                #puts lists
                
                selector = gets.chomp.to_i
                
                until lists.include?(selector)
                    puts "Hmm... bond with the id you put is missing. Select again."
                    selector = gets.chomp.to_i
                end
                
                this_game.cash += pointer[selector].value
                this_game.act_record << ActionRecords.new(month, "Sell bonds", "+$"+amount.to_s, "-$"+amount.to_s, "+/- 0", "+/- 0")
                pointer[selector].sell(month)


                decision_flag = 0
            when 5
                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")      
                #Debts.new    
                decision_flag = 0
            when 6
                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")      
                #Debts.sell    
                decision_flag = 0
            when 7
                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")      
                #Labor.new   
                decision_flag = 0
            when 8
                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")      
                #Labor.grow       #cash decreases.
                decision_flag = 0
            when 9
                puts "Sorry. Now only Stocks are available. Choose 1 or 2."
                this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")      
                decision_flag = 0
            when 0
                puts "DEBUG: YOU PUT 0. The turn is skipped."
                puts "DEBUG 1"
                puts this_game.act_record
                puts "DEBUG 2"
                var1 = this_game.act_record.at(1)
                puts var1
                puts "DEBUG 3"
                var2 = this_game.act_record[1].values_at(1)
                puts var2
                puts "DEBUG 4"
                var3 = pointer[1].id
                var4 = pointer[2].value
                puts var3
                puts var4
                puts this_game.v_o_stk
                puts this_game.v_o_bnd
                puts total_stocks
               this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")                     

                decision_flag = 0
                
            when 10
                decision_flag = 0
                this_game.act_record << ActionRecords.new(month, "skipped", "+/- 0", "+/- 0", "+/- 0", "+/- 0")                        
            else
                puts "Pardon me? input [1]~[10]."
                act_no = gets.chomp.to_i
        end
    end
    
    #calculation process   

        j = 1
        total_stocks =0
        total_bonds  =0
        total_debts  =0
        until j > month
            actcode = actcodes[j]
            case actcode
                when 1
                    if pointer[j].state == "HOLD"
                       pointer[j].closing           #評価額変動＋配当処理
                       total_stocks += pointer[j].value
                       this_game.cash += pointer[j].income
                    end
                when 2
                    
                when 3
                     if pointer[j].state == "HOLD"
                       pointer[j].closing           #評価額変動＋配当処理
                       total_bonds += pointer[j].value
                       this_game.cash += pointer[j].income
                    end               
                when 4
                    
                when 5
                
                when 6
                    
                when 7
                
                when 8
                    
                when 9    
            end
            
            
            j += 1
        end

    
    this_game.closing(total_stocks, total_bonds, total_debts)

end