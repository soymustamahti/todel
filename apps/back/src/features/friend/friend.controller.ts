import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { FriendService } from 'src/features/friend/friend.service';
import { Request } from 'express';
import { User } from 'src/shared/lib/interfaces/user';
import { FriendDto } from 'src/features/friend/friend.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Friends')
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Get('not-accepted')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all not accepted friends requests',
    description: 'List all not accepted friends requests',
  })
  public getNotAcceptedFriendsRequests(@Req() req: Request) {
    return this.friendService.getNotAcceptedFriendsRequests(req.user as User);
  }

  @Get('accepted')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'List all accepted friends',
    description: 'List all accepted friends',
  })
  public getAcceptedFriends(@Req() req: Request) {
    return this.friendService.getAcceptedFriends(req.user as User);
  }

  @Post('send')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Send friend request',
    description: 'Send friend request',
  })
  @ApiBody({
    description: 'Friend request',
    type: FriendDto,
  })
  public friendRequest(@Body() friend: FriendDto, @Req() req: Request) {
    return this.friendService.friendRequest(req.user as User, friend);
  }

  @Put('accept/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Accept friend request',
    description: 'Accept friend request',
  })
  @ApiParam({
    name: 'id',
    description: 'Friend request id',
    type: 'string',
    required: true,
  })
  public acceptFriendRequest(
    @Param('id') idRequest: string,
    @Req() req: Request,
  ) {
    return this.friendService.acceptFriendRequest(req.user as User, idRequest);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete friend',
    description: 'Delete friend',
  })
  @ApiParam({
    name: 'id',
    description: 'Friend id',
    type: 'string',
    required: true,
  })
  public deleteFriend(@Param('id') id: string, @Req() req: Request) {
    return this.friendService.deleteFriend(req.user as User, id);
  }
}
