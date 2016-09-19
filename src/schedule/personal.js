eventApp.controller("PersonalCtrl", function($scope, $window, $http, EventService, $timeout) {
      var urlParams = {
            'userid': EventService.getCookie('userid') ? EventService.getCookie('userid') : "",
            'startdate': '',
            'enddate': '',
      };

      $scope.scheduletype = [true, true, true, true, true];
      $scope.scheduleTypeClick = function(index){
            var scheduletypes = EventService.getScheduletypes();
            var typeId = scheduletypes[index].id;
            var disPlayEvents = EventService.getEventsByType(typeId, false);
            if($scope.scheduletype[index]){
                  for(var i = 0, j = disPlayEvents.length; i < j; i++){
                        $('#calendar').fullCalendar('removeEvents',  disPlayEvents[i].id);
                  }
            } else{
                  $('#calendar').fullCalendar('addEventSource',  disPlayEvents);
            }
            $scope.scheduletype[index] = !$scope.scheduletype[index];
      };

      $(function() {
            $('#calendar').fullCalendar({
                  header: {
                        left: 'prev, next today',
                        center: 'title',
                        right: 'month, agendaWeek',
                        allDayDefault: false,
                  },
                  firstDay:1,
                  eventClick: function(calEvent, jsEvent, view) {
                        $scope.$apply(
                            function(){
                                    $scope.currentEvent = EventService.getEventDetail(calEvent.id);
                            }
                        );
                        $("#schedule").removeClass("active").removeClass("in");
                        $("#detail").addClass("active").addClass("in");
                  },
                  events: function(start, end, callback){
                        EventService.showLoading('数据获取中，请稍后... ...');
                        urlParams.startdate = start.format("yyyy-MM-dd");
                        urlParams.enddate = end.format("yyyy-MM-dd");
                        EventService.getEvents(EventService.parseParam(urlParams), false, callback);
                  },
            });
      });

      $scope.delete = function(id){
            EventService.deleteEventById($scope.currentEvent.id);
      };

      $scope.addClick = function(){
            $scope.scheduletypes = EventService.getScheduletypes();
            $scope.scope = EventService.getScope();
            $scope.addParams = {
                  "title": "",
                  "scheduletype": "",
                  "startdate": new Date().format("yyyy-MM-dd"),
                  "description": "",
                  "scope": "",
                  "enddate": new Date().format("yyyy-MM-dd"),
                  "starttime": "8:30",
                  "endtime": "18:30",
                  "address": "",
                  "content": "",
                  "responsible": "",
                  "responsibledepartment": "",
                  "sourcelink": "",
                  "createuserid": urlParams.userid,
                  "createusername": EventService.getCookie('username') ? EventService.getCookie('username') : "",
                  "createtime": new Date().format("yyyy-MM-dd"),
                  "other": "",
                  "people": {
                        "companyid": "",
                        "scheduletype": "",
                        "userid": "",
                        "username": "",
                        "peopletype": "",
                        "updatetime": "",
                        "collsaceid": ""
                  }
            };
            $("#startdate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
            $("#enddate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
            $timeout(
                function() {
                      $("#myTab").children().eq(0).addClass("active");
                      $("#myTab").children().eq(3).removeClass("active");
                }, 100
            );
      };

      $scope.addEvent = function(){
            if(!$scope.addParams.people.userid || $scope.addParams.people.userid.length <= 0){
                  EventService.showAlert('请选择员工');
                  return;
            }
            if(!$scope.addParams.scheduletype || $scope.addParams.scheduletype.length <= 0){
                  EventService.showAlert('请选择日程类型');
                  return;
            }
            if(!$scope.addParams.scope || $scope.addParams.scope.id.length <= 0){
                  EventService.showAlert('请选择日程公开范围');
                  return;
            }
            $scope.addParams.startdate = $("#startdate").val();
            $scope.addParams.enddate = $("#enddate").val();
            $scope.addParams.scheduletype = $scope.addParams.scheduletype.id;
            $scope.addParams.scope = $scope.addParams.scope.id;
            EventService.showLoading('数据提交中，请稍后... ...');
            EventService.addEvent($scope.addParams, false);
      };

      $scope.addPeopleClick = function(){
            $scope.searchParams = {
                  "content": '',
                  "result": '',
            }
            $('#peopleSelectModal').modal('show');
      };

      $scope.searchPeople = function(){
            $http.get( 'http://10.15.251.110:8010/api/contact/searchuser?apikey=a16cb0c916404be78cb0805fefc7d26a&id=&q=' + $scope.searchParams.content, '')
                .success(function(response){
                      $scope.searchParams.result = response;
                      for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                            var people = $scope.searchParams.result[i];
                            var count = 0;
                            var orgtree = people.orgtree;
                            if (orgtree) {
                                  for (var orgi in orgtree) {
                                        for (var key in orgtree[orgi]){
                                              if(count == 1){
                                                    people.company = orgtree[orgi][key];
                                              } else if(count == 2){
                                                    people.office = orgtree[orgi][key];
                                              } else if(count == 3){
                                                    people.department = orgtree[orgi][key];
                                              }
                                              count++;
                                        }
                                  }
                            }
                            people.isChecked = false;
                      }
                });
      };

      $scope.userClick = function(user){
            for (var i = 0, j = $scope.searchParams.result.length; i < j; i++) {
                  $scope.searchParams.result[i].isChecked = false;
            }
            user.isChecked = true;
            $scope.addParams.people.userid = user.uid;
            $scope.addParams.people.peopletype = user.isleade;
            $scope.addParams.people.username = user.displayName;
      };

      $scope.peopleConfig = function(){
            $('#peopleSelectModal').modal('hide');
      };

      $scope.editClick = function(){
            $scope.editParams = $scope.currentEvent;
            $("#detail").removeClass("active").removeClass("in");
            $("#edit").addClass("active").addClass("in");
            $("#edit_startdate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
            $("#edit_enddate").daterangepicker({
                      singleDatePicker:true,
                      showDropdowns:true
                }
            );
      };

      $scope.editSubmit = function(){
            EventService.editEvent($scope.editParams, false);
      };
});