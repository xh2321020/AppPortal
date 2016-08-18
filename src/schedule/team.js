eventApp.controller("TeamCtrl", function($scope, $http, $timeout, EventService) {
      var urlParams = {
            'userid': EventService.getCookie('username'),
            'companyid': '',
            'collid': '',
            'type': '2',
            'startdate': '',
            'enddate': '',
      };
      var userid = EventService.getCookie('userid');
      if(userid && userid.length > 0){
            urlParams.userid = userid;
      }

      var callback = function() {
            $('#calendar').fullCalendar({
                  header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'agendaWeek',
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
                  names: EventService.getNames(),
                  events: function(start, end, callback){
                        urlParams.startdate = start.format("yyyy-MM-dd");
                        urlParams.enddate = end.format("yyyy-MM-dd");
                        EventService.showLoading('数据获取中，请稍后... ...');
                        EventService.getEvents(EventService.parseParam(urlParams), true, callback);
                        $timeout(
                            function() {
                                  document.getElementsByClassName('fc-button-agendaWeek')[0].click();
                            },
                            1
                        );
                  },
            });
      };

      $.blockUI({ message: '数据获取中，请稍候... ...',
            css: {
                  border: 'none',
                  padding: '15px',
                  backgroundColor: '#000',
                  '-webkit-border-radius': '10px',
                  '-moz-border-radius': '10px',
                  opacity: .5,
                  color: '#fff'
            }
      });
      $http.get( 'http://172.16.51.137:8000/api/V1.0/collspace/Coll/' + urlParams.userid, '')
      .success(function(response){
          if(true){
                $scope.colls = response;
                $scope.collClick($scope.colls[0]);
          }
      });

      $scope.collClick = function (coll) {
            for(var i = 0, j = $scope.colls.length; i < j; i++){
                  if(coll.collspaceid == $scope.colls[i].collspaceid){
                        $scope.colls[i].isSelected = true;
                  } else{
                        $scope.colls[i].isSelected = false;
                  }
            }
            urlParams.collid = coll.collspaceid;
            $.blockUI({ message: '数据获取中，请稍候... ...',
                  css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                  }
            });
            $("#calendar").empty();
            EventService.getPeoples(EventService.parseParam(urlParams), callback);
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

      $scope.addClick = function(){
            $scope.scheduletypes = EventService.getScheduletypes();
            $scope.scope = EventService.getScope();
            $scope.addParams = {
                  "id": "10086",
                  "title": "",
                  "scheduletype": "",
                  "userid": "10086",
                  "username": "",
                  "startdate": "2016-06-28",
                  "description": "",
                  "scope": "",
                  "enddate": "2016-06-28",
                  "starttime": "8:30",
                  "endtime": "18:30",
                  "address": "",
                  "content": "",
                  "responsible": "",
                  "responsibledepartment": "",
                  "sourcelink": "",
                  "createuserid": EventService.getCookie('userid'),
                  "createusername": "sadfa",
                  "createtime": "2016-06-28",
                  "other": "",
                  "people": {
                        "id": '10086',
                        "companyid": "",
                        "scheduletype": "",
                        "scheduleId": "10086",
                        "userid": "",
                        "username": "",
                        "companyname": "",
                        "peopletype": "",
                        "updatetime": "",
                        "collsaceid": ""
                  }
            };
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
            $scope.addParams.username = user.displayname;
            $scope.addParams.people.userid = user.uid;
            $scope.addParams.people.peopletype = user.isleade;
            $scope.addParams.people.companyname = user.orgtree;
            $scope.addParams.people.username = user.displayname;
      };

      $scope.peopleConfig = function(){
            $('#peopleSelectModal').modal('hide');
      };

      $scope.editClick = function(){
            $scope.editParams = $scope.currentEvent;
            $("#detail").removeClass("active").removeClass("in");
            $("#edit").addClass("active").addClass("in");
      };

      $scope.editSubmit = function(){
            EventService.editEvent($scope.editParams, true);
      };

      $scope.delete = function(id){
            EventService.deleteEventById($scope.currentEvent.id);
      };
});
