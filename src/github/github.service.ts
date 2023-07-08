import { Injectable } from '@nestjs/common';
import { EventType } from 'src/utils/enum/event-type.enum';
import { ForbiddenName } from 'src/utils/enum/forbidden-name.enum';

@Injectable()
export class GithubService {
  handleWebhookEvent(payload: any) {
    const eventType = this.getEventType(payload);

    switch (eventType) {
      case EventType.Push:
        this.handlePushEvent(payload);
        break;
      case EventType.Created:
        this.handleCreatedEvent(payload);
        break;
      case EventType.Deleted:
        this.handleDeletedEvent(payload);
        break;
      default:
        break;
    }
  }

  private getEventType(payload) {
    if (payload?.pusher && payload?.ref) {
      return EventType.Push;
    } else if (payload?.created) {
      return EventType.Created;
    } else if (payload?.deleted) {
      return EventType.Deleted;
    }
    return undefined;
  }

  private handleCreatedEvent(payload) {
    const teamName = payload?.team?.name;
    const forbiddenName = ForbiddenName.Hacker;
    if (teamName.startsWith(forbiddenName)) {
      console.log(
        `Suspicious behavior: Team with prefix ${forbiddenName} created`,
      );
      console.log('Event details:', payload);
    }
  }

  private handlePushEvent(payload) {
    const eventTimestamp = new Date(payload?.head_commit?.timestamp);
    const hour = eventTimestamp.getHours();

    if (hour >= 14 && hour <= 16) {
      console.log('Suspicious behavior: Code pushed between 14:00-16:00');
      console.log('Event details:', payload);
    }
  }

  private handleDeletedEvent(payload) {
    const createdTimestamp = new Date(payload?.repository?.created_at);
    const updatedAtTimestamp = new Date(payload?.repository?.updated_at);

    if (createdTimestamp && updatedAtTimestamp) {
      const timeDifference = Math.abs(
        updatedAtTimestamp.getTime() - createdTimestamp.getTime(),
      );
      const timeDifferenceMinutes = Math.floor(timeDifference / 1000 / 60);

      if (timeDifferenceMinutes <= 10) {
        console.log(
          'Suspicious behavior: Repository created and deleted within 10 minutes',
        );
        console.log('Event details:', payload);
      }
    }
  }
}
