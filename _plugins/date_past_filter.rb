module Jekyll
    module DateFilter
        def posts_passed(posts, date_param)
            now = DateTime.now
            today = DateTime.new(now.year, now.month, now.day, 0, 0, 0, now.zone)
            tomorrow = today + 1
            posts.select do |post|
                if post[date_param].to_datetime < tomorrow
                    post
                end
            end
        end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::DateFilter)