if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var api_1 = require('src/services/api');
var material_1 = require('src/directives/material');
var infinite_scroll_1 = require('../../directives/infinite-scroll');
var activity_1 = require('./activity');
var Newsfeed = (function () {
    function Newsfeed(client) {
        this.client = client;
        this.newsfeed = [];
        this.offset = "";
        this.inProgress = false;
        this.moreData = true;
        this.postMeta = {
            title: "",
            description: "",
            thumbnail: "",
            url: "",
            active: false
        };
        this.load();
    }
    Newsfeed.prototype.load = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        var self = this;
        if (this.inProgress) {
            return false;
        }
        if (refresh) {
            this.offset = "";
        }
        this.inProgress = true;
        this.client.get('api/v1/newsfeed', { limit: 12, offset: this.offset }, { cache: true })
            .then(function (data) {
            if (!data.activity) {
                self.moreData = false;
                self.inProgress = false;
                return false;
            }
            if (self.newsfeed && !refresh) {
                for (var _i = 0, _a = data.activity; _i < _a.length; _i++) {
                    var activity = _a[_i];
                    self.newsfeed.push(activity);
                }
            }
            else {
                self.newsfeed = data.activity;
            }
            self.offset = data['load-next'];
            self.inProgress = false;
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    Newsfeed.prototype.post = function () {
        var self = this;
        this.client.post('api/v1/newsfeed', this.postMeta)
            .then(function (data) {
            self.load(true);
            console.log(data);
            self.postMeta = {
                message: "",
                title: "",
                description: "",
                thumbnail: "",
                url: "",
                active: false
            };
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    Newsfeed.prototype.getPostPreview = function (message) {
        var _this = this;
        var self = this;
        var match = message.value.match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
        if (!match)
            return;
        var url;
        if (match instanceof Array) {
            url = match[0];
        }
        else {
            url = match;
        }
        if (!url.length)
            return;
        url = url.replace("http://", '');
        url = url.replace("https://", '');
        console.log('found url was ' + url);
        self.postMeta.active = true;
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.client.get('api/v1/newsfeed/preview', { url: url })
                .then(function (data) {
                console.log(data);
                self.postMeta.title = data.meta.title;
                self.postMeta.url = data.meta.canonical;
                self.postMeta.description = data.meta.description;
                for (var _i = 0, _a = data.links; _i < _a.length; _i++) {
                    var link = _a[_i];
                    if (link.rel.indexOf('thumbnail') > -1) {
                        self.postMeta.thumbnail = link.href;
                    }
                }
            });
        }, 600);
    };
    Newsfeed.prototype.toDate = function (timestamp) {
        return new Date(timestamp * 1000);
    };
    Newsfeed = __decorate([
        angular2_1.Component({
            selector: 'minds-newsfeed',
            viewInjector: [api_1.Client]
        }),
        angular2_1.View({
            templateUrl: 'templates/newsfeed/list.html',
            directives: [activity_1.Activity, angular2_1.NgFor, angular2_1.NgIf, material_1.Material, angular2_1.formDirectives, infinite_scroll_1.InfiniteScroll]
        }), 
        __metadata('design:paramtypes', [api_1.Client])
    ], Newsfeed);
    return Newsfeed;
})();
exports.Newsfeed = Newsfeed;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250cm9sbGVycy9uZXdzZmVlZC9uZXdzZmVlZC50cyJdLCJuYW1lcyI6WyJOZXdzZmVlZCIsIk5ld3NmZWVkLmNvbnN0cnVjdG9yIiwiTmV3c2ZlZWQubG9hZCIsIk5ld3NmZWVkLnBvc3QiLCJOZXdzZmVlZC5nZXRQb3N0UHJldmlldyIsIk5ld3NmZWVkLnRvRGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5QkFBNEQsbUJBQW1CLENBQUMsQ0FBQTtBQUNoRixvQkFBdUIsa0JBQWtCLENBQUMsQ0FBQTtBQUMxQyx5QkFBeUIseUJBQXlCLENBQUMsQ0FBQTtBQUNuRCxnQ0FBK0Isa0NBQWtDLENBQUMsQ0FBQTtBQUNsRSx5QkFBeUIsWUFBWSxDQUFDLENBQUE7QUFFdEM7SUF3QkNBLGtCQUFtQkEsTUFBY0E7UUFBZEMsV0FBTUEsR0FBTkEsTUFBTUEsQ0FBUUE7UUFiakNBLGFBQVFBLEdBQW1CQSxFQUFFQSxDQUFDQTtRQUM5QkEsV0FBTUEsR0FBWUEsRUFBRUEsQ0FBQ0E7UUFDcEJBLGVBQVVBLEdBQWFBLEtBQUtBLENBQUNBO1FBQzdCQSxhQUFRQSxHQUFhQSxJQUFJQSxDQUFDQTtRQUUxQkEsYUFBUUEsR0FBR0E7WUFDVEEsS0FBS0EsRUFBRUEsRUFBRUE7WUFDVEEsV0FBV0EsRUFBRUEsRUFBRUE7WUFDZkEsU0FBU0EsRUFBRUEsRUFBRUE7WUFDYkEsR0FBR0EsRUFBRUEsRUFBRUE7WUFDUEEsTUFBTUEsRUFBRUEsS0FBS0E7U0FDZEEsQ0FBQUE7UUFHREEsSUFBSUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7SUFDYkEsQ0FBQ0E7SUFLREQsdUJBQUlBLEdBQUpBLFVBQUtBLE9BQXlCQTtRQUF6QkUsdUJBQXlCQSxHQUF6QkEsZUFBeUJBO1FBQzdCQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUNkQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFBQSxDQUFDQTtZQUVsQkEs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LEVBQUVBLENBQUVBLFlBQU1BLENBQUVBO1NBQ3pCQSxDQUFDQTtRQUNEQSxlQUFJQSxDQUFDQTtZQUNKQSxXQUFXQSxFQUFFQSw4QkFBOEJBO1lBQzNDQSxVQUFVQSxFQUFFQSxDQUFFQSxtQkFBUUEsRUFBRUEsZ0JBQUtBLEVBQUVBLGVBQUlBLEVBQUVBLG1CQUFRQSxFQUFFQSx5QkFBY0EsRUFBRUEsZ0NBQWNBLENBQUVBO1NBQ2hGQSxDQUFDQTs7aUJBc0lEQTtJQUFEQSxlQUFDQTtBQUFEQSxDQTdJQSxJQTZJQztBQXBJWSxnQkFBUSxXQW9JcEIsQ0FBQSIsImZpbGUiOiJzcmMvY29udHJvbGxlcnMvbmV3c2ZlZWQvbmV3c2ZlZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXcsIE5nRm9yLCBOZ0lmLCBmb3JtRGlyZWN0aXZlc30gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnc3JjL3NlcnZpY2VzL2FwaSc7XG5pbXBvcnQgeyBNYXRlcmlhbCB9IGZyb20gJ3NyYy9kaXJlY3RpdmVzL21hdGVyaWFsJztcbmltcG9ydCB7IEluZmluaXRlU2Nyb2xsIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9pbmZpbml0ZS1zY3JvbGwnO1xuaW1wb3J0IHsgQWN0aXZpdHkgfSBmcm9tICcuL2FjdGl2aXR5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWluZHMtbmV3c2ZlZWQnLFxuICB2aWV3SW5qZWN0b3I6IFsgQ2xpZW50IF1cbn0pXG5AVmlldyh7XG4gIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL25ld3NmZWVkL2xpc3QuaHRtbCcsXG4gIGRpcmVjdGl2ZXM6IFsgQWN0aXZpdHksIE5nRm9yLCBOZ0lmLCBNYXRlcmlhbCwgZm9ybURpcmVjdGl2ZXMsIEluZmluaXRlU2Nyb2xsIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBOZXdzZmVlZCB7XG5cblx0bmV3c2ZlZWQgOiBBcnJheTxPYmplY3Q+ID0gW107XG5cdG9mZnNldCA6IHN0cmluZyA9IFwiXCI7XG4gIGluUHJvZ3Jlc3MgOiBib29sZWFuID0gZmFsc2U7XG4gIG1vcmVEYXRhIDogYm9vbGVhbiA9IHRydWU7XG5cbiAgcG9zdE1ldGEgPSB7XG4gICAgdGl0bGU6IFwiXCIsXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgdGh1bWJuYWlsOiBcIlwiLFxuICAgIHVybDogXCJcIixcbiAgICBhY3RpdmU6IGZhbHNlXG4gIH1cblxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgY2xpZW50OiBDbGllbnQpe1xuXHRcdHRoaXMubG9hZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExvYWQgbmV3c2ZlZWRcblx0ICovXG5cdGxvYWQocmVmcmVzaCA6IGJvb2xlYW4gPSBmYWxzZSl7XG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKHRoaXMuaW5Qcm9ncmVzcyl7XG4gICAgICAvL2NvbnNvbGUubG9nKCdhbHJlYWR5IGxvYWRpbmcgbW9yZS4uJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYocmVmcmVzaCl7XG4gICAgICB0aGlzLm9mZnNldCA9IFwiXCI7XG4gICAgfVxuXG4gICAgdGhpcy5pblByb2dyZXNzID0gdHJ1ZTtcblxuXHRcdHRoaXMuY2xpZW50LmdldCgnYXBpL3YxL25ld3NmZWVkJywge2xpbWl0OjEyLCBvZmZzZXQ6IHRoaXMub2Zmc2V0fSwge2NhY2hlOiB0cnVlfSlcblx0XHRcdFx0LnRoZW4oKGRhdGEgOiBNaW5kc0FjdGl2aXR5T2JqZWN0KSA9PiB7XG5cdFx0XHRcdFx0aWYoIWRhdGEuYWN0aXZpdHkpe1xuICAgICAgICAgICAgc2VsZi5tb3JlRGF0YSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5pblByb2dyZXNzID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuICAgICAgICAgIGlmKHNlbGYubmV3c2ZlZWQgJiYgIXJlZnJlc2gpe1xuICAgICAgICAgICAgZm9yKGxldCBhY3Rpdml0eSBvZiBkYXRhLmFjdGl2aXR5KVxuICAgICAgICAgICAgICBzZWxmLm5ld3NmZWVkLnB1c2goYWN0aXZpdHkpO1xuICAgICAgICAgIH0gZWxzZSB7XG5cdFx0XHRcdFx0ICAgICBzZWxmLm5ld3NmZWVkID0gZGF0YS5hY3Rpdml0eTtcbiAgICAgICAgICB9XG5cdFx0XHRcdFx0c2VsZi5vZmZzZXQgPSBkYXRhWydsb2FkLW5leHQnXTtcbiAgICAgICAgICBzZWxmLmluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xuXHRcdFx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBQb3N0IHRvIHRoZSBuZXdzZmVlZFxuXHQgKi9cblx0cG9zdCgpe1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHR0aGlzLmNsaWVudC5wb3N0KCdhcGkvdjEvbmV3c2ZlZWQnLCB0aGlzLnBvc3RNZXRhKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbihkYXRhKXtcblx0XHRcdFx0XHRzZWxmLmxvYWQodHJ1ZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgLy9yZXNldFxuICAgICAgICAgIHNlbGYucG9zdE1ldGEgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICAgICAgICAgIHRodW1ibmFpbDogXCJcIixcbiAgICAgICAgICAgIHVybDogXCJcIixcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2VcbiAgICAgICAgICB9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmdW5jdGlvbihlKXtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcblx0XHRcdFx0fSk7XG5cdH1cblxuICAvKipcbiAgICogR2V0IHJpY2ggZW1iZWQgZGF0YVxuICAgKi9cbiAgdGltZW91dDtcbiAgZ2V0UG9zdFByZXZpZXcobWVzc2FnZSl7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdmFyIG1hdGNoID0gbWVzc2FnZS52YWx1ZS5tYXRjaCgvKFxcYihodHRwcz98ZnRwfGZpbGUpOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnKTtcblx0XHRpZiAoIW1hdGNoKSByZXR1cm47XG4gICAgdmFyIHVybDtcblxuXHRcdGlmICggbWF0Y2ggaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0dXJsID0gbWF0Y2hbMF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHVybCA9IG1hdGNoO1xuXHRcdH1cblxuXHRcdGlmICghdXJsLmxlbmd0aCkgcmV0dXJuO1xuXG5cdFx0dXJsID0gdXJsLnJlcGxhY2UoXCJodHRwOi8vXCIsICcnKTtcblx0XHR1cmwgPSB1cmwucmVwbGFjZShcImh0dHBzOi8vXCIsICcnKTtcbiAgICBjb25zb2xlLmxvZygnZm91bmQgdXJsIHdhcyAnICsgdXJsKVxuXG4gICAgc2VsZi5wb3N0TWV0YS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgaWYodGhpcy50aW1lb3V0KVxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICB0aGlzLmNsaWVudC5nZXQoJ2FwaS92MS9uZXdzZmVlZC9wcmV2aWV3Jywge3VybDogdXJsfSlcbiAgICAgICAgLnRoZW4oKGRhdGEgOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBzZWxmLnBvc3RNZXRhLnRpdGxlID0gZGF0YS5tZXRhLnRpdGxlO1xuICAgICAgICAgIHNlbGYucG9zdE1ldGEudXJsID0gZGF0YS5tZXRhLmNhbm9uaWNhbDtcbiAgICAgICAgICBzZWxmLnBvc3RNZXRhLmRlc2NyaXB0aW9uID0gZGF0YS5tZXRhLmRlc2NyaXB0aW9uO1xuICAgICAgICAgIGZvciAodmFyIGxpbmsgb2YgZGF0YS5saW5rcykge1xuICAgICAgICAgICAgICBpZiAobGluay5yZWwuaW5kZXhPZigndGh1bWJuYWlsJykgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0TWV0YS50aHVtYm5haWwgPSBsaW5rLmhyZWY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIDYwMCk7XG4gIH1cblxuXG5cblx0LyoqXG5cdCAqIEEgdGVtcG9yYXJ5IGhhY2ssIGJlY2F1c2UgcGlwZXMgZG9uJ3Qgc2VlbSB0byB3b3JrXG5cdCAqL1xuXHR0b0RhdGUodGltZXN0YW1wKXtcblx0XHRyZXR1cm4gbmV3IERhdGUodGltZXN0YW1wKjEwMDApO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=